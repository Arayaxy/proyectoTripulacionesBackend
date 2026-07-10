import { Router } from 'express';

import { authenticate, authorize, validateInputs } from '../middlewares/index.js';
import {
  estadoIdValidation,
  createEstadoValidation,
  updateEstadoValidation,
} from '../validations/estado.validation.js';
import {
  getEstados,
  getEstado,
  postEstado,
  patchEstado,
  deleteEstado,
} from '../controllers/estado.controller.js';

export const estadoRouter = Router();

estadoRouter.use(authenticate, authorize('admin'));

estadoRouter.get('/', getEstados);
estadoRouter.get('/:id', estadoIdValidation, validateInputs, getEstado);
estadoRouter.post('/', createEstadoValidation, validateInputs, postEstado);
estadoRouter.patch('/:id', estadoIdValidation, updateEstadoValidation, validateInputs, patchEstado);
estadoRouter.delete('/:id', estadoIdValidation, validateInputs, deleteEstado);