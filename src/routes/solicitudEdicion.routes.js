import { Router } from 'express';

import { authenticate, authorize, validateInputs } from '../middlewares/index.js';
import {
  createSolicitudEdicionValidation,
  estadoQuerySolicitudEdicionValidation,
  estadoSolicitudEdicionValidation,
  solicitudEdicionIdValidation,
} from '../validations/solicitudEdicion.validation.js';

import {
  aprobarSolicitudEdicion,
  deleteSolicitudEdicion,
  getSolicitudEdicion,
  getSolicitudesEdicion,
  patchSolicitudEdicion,
  postSolicitudEdicion,
  rechazarSolicitudEdicion,
} from '../controllers/solicitudEdicion.controller.js';

export const solicitudEdicionRouter = Router();

solicitudEdicionRouter.get('/', authenticate, authorize('admin'), estadoQuerySolicitudEdicionValidation, validateInputs, getSolicitudesEdicion);
solicitudEdicionRouter.get('/:id', authenticate, authorize('admin'), solicitudEdicionIdValidation, validateInputs, getSolicitudEdicion);
solicitudEdicionRouter.post('/', authenticate, authorize('admin', 'ponente'), createSolicitudEdicionValidation, validateInputs, postSolicitudEdicion);
solicitudEdicionRouter.patch('/:id/aprobar', authenticate, authorize('admin'), solicitudEdicionIdValidation, validateInputs, aprobarSolicitudEdicion);
solicitudEdicionRouter.patch('/:id/rechazar', authenticate, authorize('admin'), solicitudEdicionIdValidation, validateInputs, rechazarSolicitudEdicion);
solicitudEdicionRouter.patch('/:id', authenticate, authorize('admin'), solicitudEdicionIdValidation, estadoSolicitudEdicionValidation, validateInputs, patchSolicitudEdicion);
solicitudEdicionRouter.delete('/:id', authenticate, authorize('admin'), solicitudEdicionIdValidation, validateInputs, deleteSolicitudEdicion);
