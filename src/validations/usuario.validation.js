import { checkSchema } from 'express-validator';

export const usuarioIdValidation = checkSchema({
  id: {
    isUUID: { errorMessage: 'El identificador del usuario no es válido' },
  },
}, ['params']);

export const createUsuarioValidation = checkSchema({
  nombreUsuario: {
    trim: true,
    notEmpty: { errorMessage: 'El nombre de usuario es obligatorio' },
    escape: true,
  },
  rol: {
    trim: true,
    notEmpty: { errorMessage: 'El rol es obligatorio' },
    isIn: {
      options: [['admin']],
      errorMessage: 'El rol debe ser admin',
    },
  },
}, ['body']);

export const updateUsuarioValidation = checkSchema({
  nombreUsuario: { optional: true, trim: true, escape: true },
  rol: { optional: true, trim: true, isIn: { options: [['admin']], errorMessage: 'El rol debe ser admin' } },
}, ['body']);