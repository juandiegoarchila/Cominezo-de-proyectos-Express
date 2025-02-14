//src/middleware/validation.js

import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Error de validación',
      message: 'Los datos proporcionados no cumplen con los requisitos.',
      status: 400,
      details: errors.array().map((err) => ({
        campo: err.param,
        mensaje: err.msg,
      })),
    });
  }

  next();
};
