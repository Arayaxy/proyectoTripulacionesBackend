import { checkSchema } from 'express-validator';

export const espacioIdValidation = checkSchema({
  id: {
    isUUID: {
      errorMessage: 'El identificador del espacio no es válido',
    },
  },
}, ['params']);

export const createEspacioValidation = checkSchema({
  nombreEspacio: {
    trim: true,
    notEmpty: {
      errorMessage: 'El nombre del espacio es obligatorio',
    },
    escape: true,
  },
  ciudad: {
    trim: true,
    notEmpty: {
      errorMessage: 'La ciudad es obligatoria',
    },
    escape: true,
  },
  direccion: {
    trim: true,
    notEmpty: {
      errorMessage: 'La dirección es obligatoria',
    },
    escape: true,
  },
  aforo: {
    notEmpty: {
      errorMessage: 'El aforo es obligatorio',
    },
    isInt: {
      options: { min: 1 },
      errorMessage: 'El aforo debe ser un entero mayor que cero',
    },
    toInt: true,
  },
}, ['body']);

export const updateEspacioValidation = checkSchema({
  nombreEspacio: { optional: true, trim: true, escape: true },
  ciudad: { optional: true, trim: true, escape: true },
  direccion: { optional: true, trim: true, escape: true },
  aforo: { optional: true, isInt: { options: { min: 1 } }, toInt: true },
  nota: { optional: true, trim: true, escape: true },
  telefonoContacto: { optional: true, trim: true, escape: true },
  nombreContacto: { optional: true, trim: true, escape: true },
  emailContacto: { optional: true, trim: true, isEmail: true, normalizeEmail: true },
}, ['body']);