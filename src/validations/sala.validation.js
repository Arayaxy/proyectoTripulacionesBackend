import { checkSchema } from 'express-validator';

export const salaIdValidation = checkSchema({
  id: {
    isUUID: {
      errorMessage: 'El identificador de la sala no es válido',
    },
  },
}, ['params']);

export const createSalaValidation = checkSchema({
  nombreSala: {
    trim: true,
    notEmpty: {
      errorMessage: 'El nombre de la sala es obligatorio',
    },
    escape: true,
  },
  tipoSala: {
    trim: true,
    notEmpty: {
      errorMessage: 'El tipo de sala es obligatorio',
    },
    escape: true,
  },
  capacidadMaxSala: {
    notEmpty: {
      errorMessage: 'La capacidad máxima es obligatoria',
    },
    isInt: {
      options: { min: 1 },
      errorMessage: 'La capacidad máxima debe ser un entero mayor que cero',
    },
    toInt: true,
  },
  idEspacio: {
    notEmpty: {
      errorMessage: 'El id del espacio es obligatorio',
    },
    isUUID: {
      errorMessage: 'El id del espacio no es un UUID válido',
    },
  },
}, ['body']);

export const updateSalaValidation = checkSchema({
  nombreSala: { optional: true, trim: true, escape: true },
  tipoSala: { optional: true, trim: true, escape: true },
  capacidadMaxSala: { optional: true, isInt: { options: { min: 1 } }, toInt: true },
  notaSala: { optional: true, trim: true, escape: true },
  idEspacio: { optional: true, isUUID: { errorMessage: 'El id del espacio no es un UUID válido' } },
}, ['body']);