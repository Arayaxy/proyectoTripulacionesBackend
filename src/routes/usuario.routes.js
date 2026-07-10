import { Router } from 'express';

import { authenticate, authorize, validateInputs } from '../middlewares/index.js';
import {
  usuarioIdValidation,
  createUsuarioValidation,
  updateUsuarioValidation,
} from '../validations/usuario.validation.js';
import {
  getUsuarios,
  getUsuario,
  postUsuario,
  patchUsuario,
  deleteUsuario,
} from '../controllers/usuario.controller.js';

export const usuarioRouter = Router();

usuarioRouter.use(authenticate, authorize('admin'));

usuarioRouter.get('/', getUsuarios);
usuarioRouter.get('/:id', usuarioIdValidation, validateInputs, getUsuario);
usuarioRouter.post('/', createUsuarioValidation, validateInputs, postUsuario);
usuarioRouter.patch('/:id', usuarioIdValidation, updateUsuarioValidation, validateInputs, patchUsuario);
usuarioRouter.delete('/:id', usuarioIdValidation, validateInputs, deleteUsuario);