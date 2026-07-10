import { checkSchema } from 'express-validator';

export const estadoIdValidation = checkSchema({
  id: {
    isUUID: { errorMessage: 'El identificador del estado no es válido' },
  },
}, ['params']);

export const createEstadoValidation = checkSchema({
  descripcion: {
    trim: true,
    notEmpty: { errorMessage: 'La descripción del estado es obligatoria' },
    escape: true,
  },
}, ['body']);

export const updateEstadoValidation = checkSchema({
  descripcion: { optional: true, trim: true, escape: true },
}, ['body']);