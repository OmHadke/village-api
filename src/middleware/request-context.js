import crypto from 'node:crypto';

export function requestContext(req, res, next) {
  req.requestId = `req_${crypto.randomUUID()}`;
  req.startTime = performance.now();
  res.setHeader('X-Request-Id', req.requestId);
  next();
}
