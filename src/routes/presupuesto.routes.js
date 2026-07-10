import { Router } from 'express';

import { authenticate, authorize, validateInputs } from '../middlewares/index.js';
import {
  presupuestoIdValidation,
  createPresupuestoValidation,
  updatePresupuestoValidation,
} from '../validations/presupuesto.validation.js';
import {
  getPresupuestos,
  getPresupuesto,
  postPresupuesto,
  patchPresupuesto,
  deletePresupuesto,
} from '../controllers/presupuesto.controller.js';

export const presupuestoRouter = Router();

presupuestoRouter.use(authenticate, authorize('admin'));

presupuestoRouter.get('/', getPresupuestos);
presupuestoRouter.get('/:id', presupuestoIdValidation, validateInputs, getPresupuesto);
presupuestoRouter.post('/', createPresupuestoValidation, validateInputs, postPresupuesto);
presupuestoRouter.patch('/:id', presupuestoIdValidation, updatePresupuestoValidation, validateInputs, patchPresupuesto);
presupuestoRouter.delete('/:id', presupuestoIdValidation, validateInputs, deletePresupuesto);