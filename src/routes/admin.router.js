import { Router } from 'express';
import { body, param } from 'express-validator';

import { validarToken } from '../middlewares/auth.middleware.js';
import { validarRol } from '../middlewares/validarRol.js';
import { validate } from '../middlewares/validate.middleware.js';

import {
  getEventos, getEventoById, createEvento, updateEvento, deleteEvento
} from '../controllers/admin.controller.js';

export const adminRouter = Router();

adminRouter.use(validarToken, validarRol('admin'));

adminRouter.get('/eventos', getEventos);

adminRouter.get('/eventos/:id', [
  param('id').isInt().withMessage('El id debe ser un numero entero'),
  validate
], getEventoById);

adminRouter.post('/evento', [
  body('nombre').notEmpty().withMessage('El nombre del evento es obligatorio'),
  body('lugar').notEmpty().withMessage('El lugar es obligatorio'),
  body('fecha').notEmpty().withMessage('La fecha es obligatoria'),
  body('tipo').isIn(['jornadas', 'congreso']).withMessage('El tipo debe ser jornadas o congreso'),
  body('aforo').isInt({ min: 1 }).withMessage('El aforo debe ser un numero positivo'),
  validate
], createEvento);

adminRouter.patch('/evento', [
  body('id').isInt().withMessage('El id debe ser un numero entero'),
  validate
], updateEvento);

adminRouter.delete('/evento', [
  body('id').isInt().withMessage('El id debe ser un numero entero'),
  validate
], deleteEvento);
