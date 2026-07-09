import { Router } from 'express';
import { query } from 'express-validator';

import { authenticate, authorize, validateInputs } from '../middlewares/index.js';
import {
  ponenciaIdValidation,
  createPonenciaValidation,
  updatePonenciaValidation,
} from '../validations/ponencia.validation.js';

import {
  getPonencias,
  getPonencia,
  postPonencia,
  patchPonencia,
  deletePonencia,
} from '../controllers/ponencia.controller.js';

export const ponenciaRouter = Router();

ponenciaRouter.use(authenticate, authorize('admin'));

ponenciaRouter.get('/', getPonencias);
ponenciaRouter.get('/:id', ponenciaIdValidation, validateInputs, getPonencia);
ponenciaRouter.post('/', createPonenciaValidation, validateInputs, postPonencia);
ponenciaRouter.patch('/:id', ponenciaIdValidation, updatePonenciaValidation, validateInputs, patchPonencia);
ponenciaRouter.delete('/:id', ponenciaIdValidation, validateInputs, deletePonencia);