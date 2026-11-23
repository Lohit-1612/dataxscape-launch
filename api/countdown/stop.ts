export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let rem = 41 * 86400 + 21 * 3600 + 20 * 60 + 47;
  try {
    let body = req.body;
    if (typeof body === 'string' && body.trim().length > 0) {
      body = JSON.parse(body);
    }
    if (body && typeof body.remainingSeconds === 'number') {
      rem = body.remainingSeconds;
    }
  } catch {}

  return res.status(200).json({
    success: true,
    isRunning: false,
    hasStarted: true,
    remainingSeconds: rem,
    timestamp: Date.now(),
  });
}
