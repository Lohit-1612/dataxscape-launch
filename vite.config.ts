import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function backendApiPlugin(): Plugin {
  const sseClients = new Set<any>();
  let authoritativeIsRunning = false;
  let authoritativeHasStarted = false;
  // Default to 41 days 21 hours 20 mins 47 secs (3,619,247 seconds)
  let authoritativeRemainingSeconds = 41 * 86400 + 21 * 3600 + 20 * 60 + 47;
  let authoritativeTargetEpoch = 0;

  try {
    const initData = readSiteData();
    if (initData?.countdown) {
      if (typeof initData.countdown.hasStarted === 'boolean') {
        authoritativeHasStarted = initData.countdown.hasStarted;
      }
      if (typeof initData.countdown.isRunning === 'boolean') {
        authoritativeIsRunning = initData.countdown.isRunning;
      }
      if (typeof initData.countdown.remainingSeconds === 'number') {
        authoritativeRemainingSeconds = initData.countdown.remainingSeconds;
      }
    }
  } catch {}

  function broadcastCountdown(payload: any) {
    const data = `data: ${JSON.stringify(payload)}\n\n`;
    for (const client of sseClients) {
      try {
        client.write(data);
      } catch {
        sseClients.delete(client);
      }
    }
  }

  function readSiteData(): any {
    try {
      const filePath = path.resolve(__dirname, 'public/site-data.json');
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }
    } catch (e) {
      console.warn('Error reading site-data.json:', e);
    }
    return null;
  }

  function writeSiteData(data: any): boolean {
    try {
      const filePath = path.resolve(__dirname, 'public/site-data.json');
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (e) {
      console.error('Error writing site-data.json:', e);
      return false;
    }
  }

  function getCurrentRemainingSeconds(): number {
    if (!authoritativeIsRunning) {
      return authoritativeRemainingSeconds;
    }
    const left = Math.max(0, Math.ceil((authoritativeTargetEpoch - Date.now()) / 1000));
    authoritativeRemainingSeconds = left;
    return left;
  }

  // Load initial state on server start
  try {
    const initData = readSiteData();
    if (initData?.countdown) {
      authoritativeIsRunning = Boolean(initData.countdown.isRunning);
      authoritativeHasStarted = Boolean(initData.countdown.hasStarted);
      if (typeof initData.countdown.targetEpoch === 'number' && initData.countdown.targetEpoch > Date.now()) {
        authoritativeTargetEpoch = initData.countdown.targetEpoch;
        authoritativeRemainingSeconds = Math.max(0, Math.ceil((authoritativeTargetEpoch - Date.now()) / 1000));
      } else if (typeof initData.countdown.remainingSeconds === 'number' && initData.countdown.remainingSeconds > 0) {
        authoritativeRemainingSeconds = initData.countdown.remainingSeconds;
        if (authoritativeIsRunning) {
          authoritativeTargetEpoch = Date.now() + authoritativeRemainingSeconds * 1000;
        }
      } else if (initData.countdown.staticDays !== undefined) {
        authoritativeRemainingSeconds =
          (initData.countdown.staticDays * 86400) +
          (initData.countdown.staticHours * 3600) +
          (initData.countdown.staticMinutes * 60) +
          (initData.countdown.staticSeconds || 0);
        if (authoritativeIsRunning) {
          authoritativeTargetEpoch = Date.now() + authoritativeRemainingSeconds * 1000;
        }
      }
    }
  } catch (e) {
    console.warn('Init read error:', e);
  }

  return {
    name: 'backend-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/countdown') || req.url === '/api/save-site-data') {
          console.log(`[API LOG] ${req.method} ${req.url}`);
        }

        // SSE Endpoint: Real-time countdown events for instant mobile-to-screen sync
        if (req.url === '/api/countdown/events' && req.method === 'GET') {
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
          });

          const currentSecs = getCurrentRemainingSeconds();
          res.write(`data: ${JSON.stringify({
            type: 'INIT',
            isRunning: authoritativeIsRunning,
            hasStarted: authoritativeHasStarted,
            remainingSeconds: currentSecs,
            targetEpoch: authoritativeTargetEpoch,
            serverTime: Date.now()
          })}\n\n`);
          sseClients.add(res);

          req.on('close', () => {
            sseClients.delete(res);
          });
          return;
        }

        // Endpoint: Trigger Start Countdown (from mobile or admin)
        if (req.url === '/api/countdown/start' && req.method === 'POST') {
          let startFrom = getCurrentRemainingSeconds();
          if (startFrom <= 0) {
            startFrom = 41 * 86400 + 21 * 3600 + 20 * 60 + 47;
          }
          const isBirthAnimation = true;
          authoritativeHasStarted = true;
          authoritativeRemainingSeconds = startFrom;
          authoritativeTargetEpoch = Date.now() + startFrom * 1000;
          authoritativeIsRunning = true;

          const currentData = readSiteData() || {};
          if (!currentData.countdown) currentData.countdown = {};
          currentData.countdown.isRunning = true;
          currentData.countdown.hasStarted = true;
          currentData.countdown.remainingSeconds = startFrom;
          currentData.countdown.targetEpoch = authoritativeTargetEpoch;
          writeSiteData(currentData);

          broadcastCountdown({
            type: 'START',
            isRunning: true,
            hasStarted: true,
            animateBirth: isBirthAnimation,
            remainingSeconds: startFrom,
            targetEpoch: authoritativeTargetEpoch,
            serverTime: Date.now()
          });

          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({
            success: true,
            isRunning: true,
            hasStarted: true,
            animateBirth: isBirthAnimation,
            remainingSeconds: startFrom,
            targetEpoch: authoritativeTargetEpoch,
            serverTime: Date.now()
          }));
          return;
        }

        // Endpoint: Trigger Stop/Pause Countdown (from mobile or admin) — saves paused state permanently!
        if (req.url === '/api/countdown/stop' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => (body += chunk));
          req.on('end', () => {
            let clientRemaining: number | null = null;
            try {
              if (body) {
                const parsed = JSON.parse(body);
                if (typeof parsed.remainingSeconds === 'number' && parsed.remainingSeconds >= 0) {
                  clientRemaining = Math.round(parsed.remainingSeconds);
                }
              }
            } catch {}

            const pausedAt = clientRemaining !== null ? clientRemaining : getCurrentRemainingSeconds();
            authoritativeRemainingSeconds = pausedAt;
            authoritativeIsRunning = false;
            authoritativeTargetEpoch = 0;

            // Save paused time to disk so it NEVER resets on reload!
            const currentData = readSiteData() || {};
            if (!currentData.countdown) currentData.countdown = {};
            currentData.countdown.isRunning = false;
            currentData.countdown.hasStarted = true;
            currentData.countdown.remainingSeconds = pausedAt;
            currentData.countdown.targetEpoch = 0;

            // Also synchronize static fields for Admin display
            const d = Math.floor(pausedAt / 86400);
            const h = Math.floor((pausedAt % 86400) / 3600);
            const m = Math.floor((pausedAt % 3600) / 60);
            const s = pausedAt % 60;
            currentData.countdown.staticDays = d;
            currentData.countdown.staticHours = h;
            currentData.countdown.staticMinutes = m;
            currentData.countdown.staticSeconds = s;
            writeSiteData(currentData);

            broadcastCountdown({
              type: 'STOP',
              isRunning: false,
              hasStarted: true,
              remainingSeconds: pausedAt,
              targetEpoch: 0,
              serverTime: Date.now()
            });

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify({
              success: true,
              isRunning: false,
              hasStarted: true,
              remainingSeconds: pausedAt,
              targetEpoch: 0,
              serverTime: Date.now()
            }));
          });
          return;
        }

        // Endpoint: Re-arm stage countdown (sets hasStarted=false, isRunning=false, making display empty again)
        if (req.url === '/api/countdown/rearm' && req.method === 'POST') {
          authoritativeHasStarted = false;
          authoritativeIsRunning = false;
          authoritativeTargetEpoch = 0;

          const currentData = readSiteData() || {};
          if (!currentData.countdown) currentData.countdown = {};
          currentData.countdown.isRunning = false;
          currentData.countdown.hasStarted = false;
          currentData.countdown.targetEpoch = 0;
          writeSiteData(currentData);

          broadcastCountdown({
            type: 'REARM',
            isRunning: false,
            hasStarted: false,
            remainingSeconds: authoritativeRemainingSeconds,
            targetEpoch: 0,
            serverTime: Date.now()
          });

          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({
            success: true,
            isRunning: false,
            hasStarted: false
          }));
          return;
        }

        // Endpoint: Query current countdown status
        if (req.url === '/api/countdown/status' && req.method === 'GET') {
          const currentSecs = getCurrentRemainingSeconds();
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(
            JSON.stringify({
              isRunning: authoritativeIsRunning,
              hasStarted: authoritativeHasStarted,
              remainingSeconds: currentSecs,
              targetEpoch: authoritativeTargetEpoch,
              serverTime: Date.now(),
              countdown: {
                isRunning: authoritativeIsRunning,
                hasStarted: authoritativeHasStarted,
                remainingSeconds: currentSecs,
                targetEpoch: authoritativeTargetEpoch,
              },
            })
          );
          return;
        }

        // Endpoint 1: Save full site-data.json to disk (preserves paused remainingSeconds and authoritativeIsRunning)
        if (req.url === '/api/save-site-data' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => (body += chunk));
          req.on('end', () => {
            try {
              const filePath = path.resolve(__dirname, 'public/site-data.json');
              const parsed = JSON.parse(body);
              if (parsed && parsed.countdown) {
                parsed.countdown.isRunning = authoritativeIsRunning;
                parsed.countdown.remainingSeconds = authoritativeRemainingSeconds;
              }
              fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Saved to disk successfully' }));
            } catch (err) {
              console.error('Error saving site data:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: String(err) }));
            }
          });
          return;
        }

        // Endpoint 2: Upload photo and write file to public/images/gallery/ or /about/
        if (req.url === '/api/upload-photo' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => (body += chunk));
          req.on('end', () => {
            try {
              const { dataUrl, filename, folder } = JSON.parse(body);
              if (!dataUrl) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'No dataUrl provided' }));
                return;
              }

              // Extract base64 data
              const matches = dataUrl.match(/^data:([A-Za-z0-9+/]+);base64,(.+)$/);
              if (!matches || matches.length !== 3) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid base64 DataURL' }));
                return;
              }

              const buffer = Buffer.from(matches[2], 'base64');
              const sanitizedName = (filename || 'photo.jpg').replace(/[^a-zA-Z0-9.-]/g, '_');
              const uniqueFileName = `custom-${Date.now()}-${sanitizedName}`;
              const targetFolder = folder === 'about' ? 'about' : folder === 'sponsors' ? 'sponsors' : 'gallery';
              const outDir = path.resolve(__dirname, 'public/images', targetFolder);
              if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir, { recursive: true });
              }
              const outPath = path.join(outDir, uniqueFileName);
              fs.writeFileSync(outPath, buffer);

              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  url: `/images/${targetFolder}/${uniqueFileName}`,
                })
              );
            } catch (err) {
              console.error('Error saving uploaded photo:', err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: String(err) }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), backendApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true, // Listens on 0.0.0.0 so phone can connect via local IP
    port: 3000,
    open: true,
  },
});
