import { checkSchema } from 'express-validator';

export const ponenteIdValidation = checkSchema({
  id: {
    isUUID: {
      errorMessage: 'El identificador del ponente no es válido',
    },
  },
}, ['params']);

export const createPonenteValidation = checkSchema({
  nombrePonente: {
    trim: true,
    notEmpty: {
      errorMessage: 'El nombre del ponente es obligatorio',
    },
    escape: true,
  },
  email: {
    trim: true,
    notEmpty: {
      errorMessage: 'El email del ponente es obligatorio',
    },
    isEmail: {
      errorMessage: 'El formato del email no es correcto',
    },
    normalizeEmail: true,
  },
}, ['body']);

export const updatePonenteValidation = checkSchema({
  nombrePonente: { optional: true, trim: true, escape: true },
  docuIdentificacion: { optional: true, trim: true, escape: true },
  email: { optional: true, trim: true, isEmail: true, normalizeEmail: true },
  sector: { optional: true, trim: true, escape: true },
  telefono: { optional: true, trim: true, escape: true },
  empresa: { optional: true, trim: true, escape: true },
  cargo: { optional: true, trim: true, escape: true },
}, ['body']);