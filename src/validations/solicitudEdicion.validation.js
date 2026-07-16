import { checkSchema } from 'express-validator';

const estadosSolicitud = ['Pendiente', 'Aprobada', 'Rechazada'];
const camposPermitidos = [
  'email',
  'telefono',
  'empresa',
  'cargo',
  'sector',
  'docuIdentificacion',
  'nombreHotel',
  'localizacionHotel',
  'notaTransporte',
  'ponenteEstado',
  'tipoPonencia',
];

export const solicitudEdicionIdValidation = checkSchema({
  id: {
    isUUID: {
      errorMessage: 'El identificador de la solicitud no es válido',
    },
  },
}, ['params']);

export const createSolicitudEdicionValidation = checkSchema({
  idPonencia: {
    notEmpty: {
      errorMessage: 'El id de la ponencia es obligatorio',
    },
    isUUID: {
      errorMessage: 'El id de la ponencia no es un UUID válido',
    },
  },
  campo: {
    trim: true,
    notEmpty: {
      errorMessage: 'El campo a modificar es obligatorio',
    },
    isIn: {
      options: [camposPermitidos],
      errorMessage: 'El campo solicitado no se puede modificar',
    },
  },
  valorSolicitado: {
    trim: true,
    notEmpty: {
      errorMessage: 'El nuevo valor es obligatorio',
    },
    escape: true,
  },
  mensaje: {
    optional: true,
    trim: true,
    escape: true,
  },
}, ['body']);

export const estadoSolicitudEdicionValidation = checkSchema({
  estado: {
    trim: true,
    notEmpty: {
      errorMessage: 'El estado es obligatorio',
    },
    isIn: {
      options: [estadosSolicitud],
      errorMessage: 'El estado de la solicitud no es válido',
    },
  },
}, ['body']);

export const estadoQuerySolicitudEdicionValidation = checkSchema({
  estado: {
    optional: true,
    trim: true,
    isIn: {
      options: [estadosSolicitud],
      errorMessage: 'El filtro de estado no es válido',
    },
  },
}, ['query']);
