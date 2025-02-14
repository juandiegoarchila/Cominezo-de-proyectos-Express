//src/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(`[❌ ERROR] ${err.name}: ${err.message}`);

  const errorTypes = {
    ValidationError: { status: 400, message: 'Datos inválidos' },
    'auth/invalid-credential': {
      status: 401,
      message: 'Credenciales inválidas',
    },
    NotFoundError: { status: 404, message: 'Recurso no encontrado' },
    UnauthorizedError: { status: 403, message: 'Acceso no autorizado' },
  };

  const errorResponse = errorTypes[err.name] || {
    status: 500,
    message: 'Error interno del servidor',
  };

  res.status(errorResponse.status).json({
    error: errorResponse.message,
    status: errorResponse.status,
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorHandler;
