import prisma from '../lib/prisma.js';

const includePonenciaDetalle = {
  ponencia: {
    include: {
      ponente: true,
      evento: true,
    },
  },
};

export const findSolicitudesEdicion = ({ includePonencia = false, where } = {}) => {
  return prisma.solicitudEdicion.findMany({
    where,
    include: includePonencia ? includePonenciaDetalle : undefined,
  });
};

export const findSolicitudEdicionById = (id, { includePonencia = false } = {}) => {
  return prisma.solicitudEdicion.findUnique({
    where: { id },
    include: includePonencia ? includePonenciaDetalle : undefined,
  });
};

export const createSolicitudEdicion = (data) => {
  return prisma.solicitudEdicion.create({ data });
};

export const updateSolicitudEdicion = (id, data) => {
  return prisma.solicitudEdicion.update({ where: { id }, data });
};

const camposPonente = ['email', 'telefono', 'empresa', 'cargo', 'sector', 'docuIdentificacion'];
const camposPonencia = ['nombreHotel', 'localizacionHotel', 'notaTransporte', 'ponenteEstado', 'tipoPonencia'];

export const approveSolicitudEdicion = async (id) => {
  return prisma.$transaction(async (tx) => {
    const solicitud = await tx.solicitudEdicion.findUnique({
      where: { id },
      include: { ponencia: true },
    });

    if (!solicitud) {
      const err = new Error('Solicitud de edición no encontrada');
      err.status = 404;
      throw err;
    }

    if (solicitud.estado !== 'Pendiente') {
      const err = new Error('La solicitud ya fue revisada');
      err.status = 400;
      throw err;
    }

    const data = {
      [solicitud.campo]: solicitud.valorSolicitado,
    };

    if (camposPonente.includes(solicitud.campo)) {
      await tx.ponente.update({
        where: { id: solicitud.ponencia.idPonente },
        data,
      });
    } else if (camposPonencia.includes(solicitud.campo)) {
      await tx.ponencia.update({
        where: { id: solicitud.idPonencia },
        data,
      });
    } else {
      const err = new Error('Campo no permitido para actualizar');
      err.status = 400;
      throw err;
    }

    return tx.solicitudEdicion.update({
      where: { id },
      data: { estado: 'Aprobada' },
      include: includePonenciaDetalle,
    });
  });
};

export const rejectSolicitudEdicion = async (id) => {
  const solicitud = await prisma.solicitudEdicion.findUnique({
    where: { id },
  });

  if (!solicitud) {
    const err = new Error('Solicitud de edición no encontrada');
    err.status = 404;
    throw err;
  }

  if (solicitud.estado !== 'Pendiente') {
    const err = new Error('La solicitud ya fue revisada');
    err.status = 400;
    throw err;
  }

  return prisma.solicitudEdicion.update({
    where: { id },
    data: { estado: 'Rechazada' },
    include: includePonenciaDetalle,
  });
};

export const removeSolicitudEdicion = (id) => {
  return prisma.solicitudEdicion.delete({ where: { id } });
};
