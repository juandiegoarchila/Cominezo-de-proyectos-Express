// src/validators/userValidator.js

import { body } from 'express-validator';

export const userValidationRules = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Debe ser un correo válido'),
];
