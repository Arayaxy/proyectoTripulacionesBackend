import prisma from '../lib/prisma.js';

export const getEventos = async (req, res, next) => {
  try {
    const { ciudad, tipoEvento } = req.query;

    let eventos;
    if (ciudad || tipoEvento) {
      const conditions = [];
      const params = [];
      if (ciudad) { conditions.push(`e.ciudad ILIKE $${params.length + 1}`); params.push(`%${ciudad}%`); }
      if (tipoEvento) { conditions.push(`e.tipo_evento ILIKE $${params.length + 1}`); params.push(`%${tipoEvento}%`); }
      eventos = await prisma.$queryRawUnsafe(
        `SELECT e.* FROM eventos e WHERE ${conditions.join(' AND ')}`,
        ...params
      );
    } else {
      eventos = await prisma.evento.findMany();
    }

    res.status(200).json({ ok: true, data: eventos });
  } catch (error) {
    next(error);
  }
};

export const getEvento = async (req, res, next) => {
  try {
    const evento = await prisma.evento.findUnique({ where: { id: req.params.id } });

    if (!evento)
      return res.status(404).json({ ok: false, message: 'Evento no encontrado', error: [{ type: 'not_found', title: 'Evento no encontrado', detail: 'No existe un evento con ese ID' }] });

    res.status(200).json({ ok: true, data: evento });
  } catch (error) {
    next(error);
  }
};

export const getPonentesEvento = async (req, res, next) => {
  try {
    const evento = await prisma.evento.findUnique({
      where: { id: req.params.id },
      include: { ponencias: { include: { ponente: true } } },
    });

    if (!evento)
      return res.status(404).json({ ok: false, message: 'Evento no encontrado', error: [{ type: 'not_found', title: 'Evento no encontrado', detail: 'No existe un evento con ese ID' }] });

    // Un ponente por cada ponencia del evento, con su logística anidada.
    const ponentes = evento.ponencias.map((ponencia) => ({
      ...ponencia.ponente,
      ponencia: { ...ponencia, ponente: undefined },
    }));

    res.status(200).json({ ok: true, data: ponentes });
  } catch (error) {
    next(error);
  }
};

export const postEvento = async (req, res, next) => {
  try {
    const { nombreEvento, ciudad, lugarConfirmado, fechaInicio, fechaFin, numeroPersonas, tipoEvento, nota, idCliente, idEstado, idPresupuesto, idSala, idPonencia } = req.body;

    const nuevo = await prisma.evento.create({
      data: {
        nombreEvento,
        idCliente, idEstado,
        ...(idPresupuesto !== undefined && { idPresupuesto }),
        ...(idSala !== undefined && { idSala }),
        ...(idPonencia !== undefined && { idPonencia }),
        ciudad: ciudad || '',
        lugarConfirmado: lugarConfirmado || '',
        fechaInicio: fechaInicio || new Date(),
        fechaFin: fechaFin || new Date(),
        tipoEvento: tipoEvento || '',
        nota: nota || '',
        numeroPersonas: parseInt(numeroPersonas, 10) || 0,
      },
    });

    res.status(201).json({ ok: true, data: nuevo });
  } catch (error) {
    if (error.code === 'P2003')
      return res.status(400).json({ ok: false, message: 'El idCliente o idEstado no existen', error: [{ type: 'foreign_key', title: 'Referencia inválida', detail: 'El idCliente o idEstado proporcionado no existe' }] });
    next(error);
  }
};

export const patchEvento = async (req, res, next) => {
  try {
    const exists = await prisma.evento.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Evento no encontrado', error: [{ type: 'not_found', title: 'Evento no encontrado', detail: 'No existe un evento con ese ID' }] });

    const { nombreEvento, ciudad, lugarConfirmado, fechaInicio, fechaFin, numeroPersonas, tipoEvento, nota, idCliente, idEstado, idPresupuesto, idSala, idPonencia } = req.body;

    const data = {};
    if (nombreEvento !== undefined) data.nombreEvento = nombreEvento;
    if (ciudad !== undefined) data.ciudad = ciudad;
    if (lugarConfirmado !== undefined) data.lugarConfirmado = lugarConfirmado;
    if (fechaInicio !== undefined) data.fechaInicio = fechaInicio;
    if (fechaFin !== undefined) data.fechaFin = fechaFin;
    if (tipoEvento !== undefined) data.tipoEvento = tipoEvento;
    if (nota !== undefined) data.nota = nota;
    if (idCliente !== undefined) data.idCliente = idCliente;
    if (idEstado !== undefined) data.idEstado = idEstado;
    if (idPresupuesto !== undefined) data.idPresupuesto = idPresupuesto;
    if (idSala !== undefined) data.idSala = idSala;
    if (idPonencia !== undefined) data.idPonencia = idPonencia;
    if (numeroPersonas !== undefined) data.numeroPersonas = parseInt(numeroPersonas, 10) || 0;

    const actualizado = await prisma.evento.update({
      where: { id: req.params.id },
      data,
    });

    res.status(200).json({ ok: true, data: actualizado });
  } catch (error) {
    if (error.code === 'P2003')
      return res.status(400).json({ ok: false, message: 'El idCliente o idEstado no existen', error: [{ type: 'foreign_key', title: 'Referencia inválida', detail: 'El idCliente o idEstado proporcionado no existe' }] });
    next(error);
  }
};

export const deleteEvento = async (req, res, next) => {
  try {
    const exists = await prisma.evento.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Evento no encontrado', error: [{ type: 'not_found', title: 'Evento no encontrado', detail: 'No existe un evento con ese ID' }] });

    await prisma.evento.delete({ where: { id: req.params.id } });

    res.status(200).json({ ok: true, message: 'Evento eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
