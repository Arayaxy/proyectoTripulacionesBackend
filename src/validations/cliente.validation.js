import { checkSchema } from 'express-validator';

export const clienteIdValidation = checkSchema({
  id: {
    isUUID: {
      errorMessage: 'El identificador del cliente no es válido',
    },
  },
}, ['params']);

export const createClienteValidation = checkSchema({
  cliente: {
    trim: true,
    notEmpty: {
      errorMessage: 'El nombre del cliente es obligatorio',
    },
    isLength: {
      options: { min: 2, max: 100 },
      errorMessage: 'El nombre debe tener entre 2 y 100 caracteres',
    },
    matches: {
      options: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'.-]+$/],
      errorMessage: 'El nombre contiene caracteres no permitidos',
    },
    escape: true,
  },
  email: {
    trim: true,
    notEmpty: {
      errorMessage: 'El email del cliente es obligatorio',
    },
    isEmail: {
      errorMessage: 'El formato del email no es correcto',
    },
    normalizeEmail: true,
  },
}, ['body']);

export const updateClienteValidation = checkSchema({
  cliente: {
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2, max: 100 },
      errorMessage: 'El nombre debe tener entre 2 y 100 caracteres',
    },
    matches: {
      options: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'.-]+$/],
      errorMessage: 'El nombre contiene caracteres no permitidos',
    },
    escape: true,
  },
  email: {
    optional: true,
    trim: true,
    isEmail: {
      errorMessage: 'El formato del email no es correcto',
    },
    normalizeEmail: true,
  },
}, ['body']);
