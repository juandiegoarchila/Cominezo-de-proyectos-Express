//src/routes/Users.js

import { Router } from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { userValidationRules } from '../validators/userValidator.js';
import { validate } from '../middleware/validation.js';

const router = Router();

router.get('/users', getUsers);
router.post('/users', userValidationRules, validate, createUser);
router.put('/users/:id', userValidationRules, validate, updateUser);
router.delete('/users/:id', deleteUser);

export default router;
