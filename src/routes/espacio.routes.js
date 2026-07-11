import { Router } from 'express';
import { query } from 'express-validator';

import { authenticate, authorize, validateInputs } from '../middlewares/index.js';
import {
  espacioIdValidation,
  createEspacioValidation,
  updateEspacioValidation,
} from '../validations/espacio.validation.js';

import {
  getEspacios,
  getEspacio,
  postEspacio,
  patchEspacio,
  deleteEspacio,
  getEspaciosByCapacidad,
} from '../controllers/espacio.controller.js';

export const espacioRouter = Router();

espacioRouter.use(authenticate, authorize('admin'));

espacioRouter.get('/buscar', [
  query('min').optional().isInt({ min: 0 }),
  query('max').optional().isInt({ min: 0 }),
], getEspaciosByCapacidad);

espacioRouter.get('/', getEspacios);
espacioRouter.get('/:id', espacioIdValidation, validateInputs, getEspacio);
espacioRouter.post('/', createEspacioValidation, validateInputs, postEspacio);
espacioRouter.patch('/:id', espacioIdValidation, updateEspacioValidation, validateInputs, patchEspacio);
espacioRouter.delete('/:id', espacioIdValidation, validateInputs, deleteEspacio);