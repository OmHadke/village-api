export function successResponse({ data, count, requestId, responseTime }) {
  return {
    success: true,
    count,
    data,
    meta: {
      requestId,
      responseTime
    }
  };
}

export function errorResponse({ message, code, requestId, responseTime }) {
  return {
    success: false,
    error: {
      code,
      message
    },
    meta: {
      requestId,
      responseTime
    }
  };
}
