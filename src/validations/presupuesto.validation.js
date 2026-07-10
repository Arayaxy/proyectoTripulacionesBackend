import { checkSchema } from 'express-validator';

export const presupuestoIdValidation = checkSchema({
  id: {
    isUUID: { errorMessage: 'El identificador del presupuesto no es válido' },
  },
}, ['params']);

export const createPresupuestoValidation = checkSchema({
  estadoPresupuesto: {
    notEmpty: { errorMessage: 'El estado del presupuesto es obligatorio' },
    isBoolean: { errorMessage: 'El estado del presupuesto debe ser booleano' },
    toBoolean: true,
  },
  total: {
    notEmpty: { errorMessage: 'El total es obligatorio' },
    isFloat: { options: { min: 0 }, errorMessage: 'El total debe ser un número positivo' },
    toFloat: true,
  },
  precioUbicacion: { optional: true, isFloat: { options: { min: 0 } }, toFloat: true },
  catering: {
    notEmpty: { errorMessage: 'El campo catering es obligatorio' },
    isBoolean: { errorMessage: 'Catering debe ser booleano' },
    toBoolean: true,
  },
  precioCatering: { optional: true, isFloat: { options: { min: 0 } }, toFloat: true },
  audiovisuales: {
    notEmpty: { errorMessage: 'El campo audiovisuales es obligatorio' },
    isBoolean: { errorMessage: 'Audiovisuales debe ser booleano' },
    toBoolean: true,
  },
  precioAudiovisuales: { optional: true, isFloat: { options: { min: 0 } }, toFloat: true },
  otros: {
    notEmpty: { errorMessage: 'El campo otros es obligatorio' },
    isBoolean: { errorMessage: 'Otros debe ser booleano' },
    toBoolean: true,
  },
  precioOtros: { optional: true, isFloat: { options: { min: 0 } }, toFloat: true },
  notaUbicacion: { optional: true, trim: true, escape: true },
  notaCatering: { optional: true, trim: true, escape: true },
  notaAudiovisuales: { optional: true, trim: true, escape: true },
  notaOtros: { optional: true, trim: true, escape: true },
  observaciones: { optional: true, trim: true, escape: true },
  fecha: { optional: true, isISO8601: { errorMessage: 'La fecha debe tener formato ISO8601' } },
}, ['body']);

export const updatePresupuestoValidation = checkSchema({
  estadoPresupuesto: { optional: true, isBoolean: true, toBoolean: true },
  total: { optional: true, isFloat: { options: { min: 0 } }, toFloat: true },
  precioUbicacion: { optional: true, isFloat: { options: { min: 0 } }, toFloat: true },
  catering: { optional: true, isBoolean: true, toBoolean: true },
  precioCatering: { optional: true, isFloat: { options: { min: 0 } }, toFloat: true },
  audiovisuales: { optional: true, isBoolean: true, toBoolean: true },
  precioAudiovisuales: { optional: true, isFloat: { options: { min: 0 } }, toFloat: true },
  otros: { optional: true, isBoolean: true, toBoolean: true },
  precioOtros: { optional: true, isFloat: { options: { min: 0 } }, toFloat: true },
  notaUbicacion: { optional: true, trim: true, escape: true },
  notaCatering: { optional: true, trim: true, escape: true },
  notaAudiovisuales: { optional: true, trim: true, escape: true },
  notaOtros: { optional: true, trim: true, escape: true },
  observaciones: { optional: true, trim: true, escape: true },
  fecha: { optional: true, isISO8601: true },
}, ['body']);