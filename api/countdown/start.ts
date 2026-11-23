export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const defaultRemaining = 41 * 86400 + 21 * 3600 + 20 * 60 + 47;
  return res.status(200).json({
    success: true,
    isRunning: true,
    hasStarted: true,
    remainingSeconds: defaultRemaining,
    targetEpoch: Date.now() + defaultRemaining * 1000,
    timestamp: Date.now(),
  });
}
