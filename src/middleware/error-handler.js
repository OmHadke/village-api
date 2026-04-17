import { errorResponse } from '../utils/response.js';

export function notFoundHandler(req, res) {
  const responseTime = Math.round(performance.now() - req.startTime);
  res.status(404).json(
    errorResponse({
      code: 'NOT_FOUND',
      message: 'Requested resource does not exist.',
      requestId: req.requestId,
      responseTime
    })
  );
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const responseTime = Math.round(performance.now() - req.startTime);
  res.status(500).json(
    errorResponse({
      code: 'INTERNAL_ERROR',
      message: 'Unexpected server error.',
      requestId: req.requestId,
      responseTime
    })
  );
}
