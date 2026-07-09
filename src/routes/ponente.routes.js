import { Router } from 'express';
import { query } from 'express-validator';

import { authenticate, authorize, validateInputs } from '../middlewares/index.js';
import {
  ponenteIdValidation,
  createPonenteValidation,
  updatePonenteValidation,
} from '../validations/ponente.validation.js';
import { imagenPonente as uploadFile } from '../middlewares/upload.middleware.js';

import {
  getPonentes,
  getPonente,
  postPonente,
  patchPonente,
  deletePonente,
} from '../controllers/ponente.controller.js';

export const ponenteRouter = Router();

ponenteRouter.use(authenticate, authorize('admin'));

ponenteRouter.get('/', getPonentes);
ponenteRouter.get('/:id', ponenteIdValidation, validateInputs, getPonente);
ponenteRouter.post('/', uploadFile, createPonenteValidation, validateInputs, postPonente);
ponenteRouter.patch('/:id', uploadFile, ponenteIdValidation, updatePonenteValidation, validateInputs, patchPonente);
ponenteRouter.delete('/:id', ponenteIdValidation, validateInputs, deletePonente);