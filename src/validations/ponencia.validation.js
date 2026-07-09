import { checkSchema } from 'express-validator';

export const ponenciaIdValidation = checkSchema({
  id: {
    isUUID: {
      errorMessage: 'El identificador de la ponencia no es válido',
    },
  },
}, ['params']);

export const createPonenciaValidation = checkSchema({
  nombreHotel: { trim: true, notEmpty: { errorMessage: 'El nombre del hotel es obligatorio' }, escape: true },
  localizacionHotel: { trim: true, notEmpty: { errorMessage: 'La localización del hotel es obligatoria' }, escape: true },
  horarioPonencia: { notEmpty: { errorMessage: 'El horario de la ponencia es obligatorio' } },
  ponenteEstado: { trim: true, notEmpty: { errorMessage: 'El estado del ponente es obligatorio' }, escape: true },
  tipoPonencia: { trim: true, notEmpty: { errorMessage: 'El tipo de ponencia es obligatorio' }, escape: true },
  idPonente: { notEmpty: { errorMessage: 'El id del ponente es obligatorio' }, isUUID: { errorMessage: 'El id del ponente no es un UUID válido' } },
}, ['body']);

export const updatePonenciaValidation = checkSchema({
  nombreHotel: { optional: true, trim: true, escape: true },
  notaTransporte: { optional: true, trim: true, escape: true },
  horarioIdaTransporte: { optional: true },
  horarioVueltaTransporte: { optional: true },
  localizacionHotel: { optional: true, trim: true, escape: true },
  horarioPonencia: { optional: true },
  checkinHorario: { optional: true },
  ponenteEstado: { optional: true, trim: true, escape: true },
  presentacionLink: { optional: true, trim: true, escape: true },
  billeteIdaLink: { optional: true, trim: true, escape: true },
  billeteVueltaLink: { optional: true, trim: true, escape: true },
  tipoPonencia: { optional: true, trim: true, escape: true },
  idPonente: { optional: true, isUUID: { errorMessage: 'El id del ponente no es un UUID válido' } },
}, ['body']);