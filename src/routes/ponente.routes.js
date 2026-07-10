import { Router } from 'express';
import { query } from 'express-validator';

import { authenticate, authorize, validateInputs } from '../middlewares/index.js';
import {
  ponenteIdValidation,
  createPonenteValidation,
  updatePonenteValidation,
} from '../validations/ponente.validation.js';
import {
  getPonentes,
  getPonente,
  getPonenteByTelegram,
  postPonente,
  patchPonente,
  deletePonente,
} from '../controllers/ponente.controller.js';

export const ponenteRouter = Router();

ponenteRouter.use(authenticate, authorize('admin'));

ponenteRouter.get('/', getPonentes);
// OJO: debe ir ANTES de '/:id' para que 'by-telegram' no se interprete como un id.
ponenteRouter.get('/by-telegram/:telegramUserId', getPonenteByTelegram);
ponenteRouter.get('/:id', ponenteIdValidation, validateInputs, getPonente);
ponenteRouter.post('/', createPonenteValidation, validateInputs, postPonente);
ponenteRouter.patch('/:id', ponenteIdValidation, updatePonenteValidation, validateInputs, patchPonente);
ponenteRouter.delete('/:id', ponenteIdValidation, validateInputs, deletePonente);