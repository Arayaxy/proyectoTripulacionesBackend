import { Router } from 'express';
import { query } from 'express-validator';

import { authenticate, authorize, validateInputs } from '../middlewares/index.js';
import {
  salaIdValidation,
  createSalaValidation,
  updateSalaValidation,
} from '../validations/sala.validation.js';

import {
  getSalas,
  getSala,
  postSala,
  patchSala,
  deleteSala,
} from '../controllers/sala.controller.js';

export const salaRouter = Router();

salaRouter.use(authenticate, authorize('admin'));

salaRouter.get('/', getSalas);
salaRouter.get('/:id', salaIdValidation, validateInputs, getSala);
salaRouter.post('/', createSalaValidation, validateInputs, postSala);
salaRouter.patch('/:id', salaIdValidation, updateSalaValidation, validateInputs, patchSala);
salaRouter.delete('/:id', salaIdValidation, validateInputs, deleteSala);