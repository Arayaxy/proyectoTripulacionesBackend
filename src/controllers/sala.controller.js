import prisma from '../lib/prisma.js';

export const getSalas = async (req, res, next) => {
  try {
    const { idEspacio } = req.query;
    const where = idEspacio ? { idEspacio } : {};
    const salas = await prisma.sala.findMany({ where });
    res.status(200).json({ ok: true, data: salas });
  } catch (error) {
    next(error);
  }
};

export const getSala = async (req, res, next) => {
  try {
    const sala = await prisma.sala.findUnique({ where: { id: req.params.id } });
    if (!sala)
      return res.status(404).json({ ok: false, message: 'Sala no encontrada', error: [{ type: 'not_found', title: 'Sala no encontrada', detail: 'No existe una sala con ese ID' }] });
    res.status(200).json({ ok: true, data: sala });
  } catch (error) {
    next(error);
  }
};

export const postSala = async (req, res, next) => {
  try {
    const { nombreSala, tipoSala, capacidadMaxSala, notaSala, idEspacio } = req.body;
    const nueva = await prisma.sala.create({
      data: {
        nombreSala,
        tipoSala,
        capacidadMaxSala,
        idEspacio,
        notaSala: notaSala || null,
      },
    });
    res.status(201).json({ ok: true, data: nueva });
  } catch (error) {
    if (error.code === 'P2003')
      return res.status(400).json({ ok: false, message: 'El idEspacio no existe', error: [{ type: 'foreign_key', title: 'Referencia inválida', detail: 'El idEspacio proporcionado no existe' }] });
    next(error);
  }
};

export const patchSala = async (req, res, next) => {
  try {
    const exists = await prisma.sala.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Sala no encontrada', error: [{ type: 'not_found', title: 'Sala no encontrada', detail: 'No existe una sala con ese ID' }] });

    const { nombreSala, tipoSala, capacidadMaxSala, notaSala, idEspacio } = req.body;
    const data = {};
    if (nombreSala !== undefined) data.nombreSala = nombreSala;
    if (tipoSala !== undefined) data.tipoSala = tipoSala;
    if (capacidadMaxSala !== undefined) data.capacidadMaxSala = capacidadMaxSala;
    if (notaSala !== undefined) data.notaSala = notaSala || null;
    if (idEspacio !== undefined) data.idEspacio = idEspacio;

    const actualizada = await prisma.sala.update({ where: { id: req.params.id }, data });
    res.status(200).json({ ok: true, data: actualizada });
  } catch (error) {
    if (error.code === 'P2003')
      return res.status(400).json({ ok: false, message: 'El idEspacio no existe', error: [{ type: 'foreign_key', title: 'Referencia inválida', detail: 'El idEspacio proporcionado no existe' }] });
    next(error);
  }
};

export const deleteSala = async (req, res, next) => {
  try {
    const exists = await prisma.sala.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Sala no encontrada', error: [{ type: 'not_found', title: 'Sala no encontrada', detail: 'No existe una sala con ese ID' }] });
    await prisma.sala.delete({ where: { id: req.params.id } });
    res.status(200).json({ ok: true, message: 'Sala eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};