const ALLOWED_KEYS = new Set(['demo_public_key_for_presentations']);

export function requireApiKey(req, res, next) {
  const apiKey = req.header('X-API-Key');

  if (!apiKey || !ALLOWED_KEYS.has(apiKey)) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_API_KEY',
        message: 'API key missing or invalid.'
      }
    });
  }

  return next();
}
