import prisma from '../lib/prisma.js';

export const getEstados = async (req, res, next) => {
  try {
    const estados = await prisma.estado.findMany();
    res.status(200).json({ ok: true, data: estados });
  } catch (error) {
    next(error);
  }
};

export const getEstado = async (req, res, next) => {
  try {
    const estado = await prisma.estado.findUnique({ where: { id: req.params.id } });
    if (!estado)
      return res.status(404).json({ ok: false, message: 'Estado no encontrado', error: [{ type: 'not_found', title: 'Estado no encontrado', detail: 'No existe un estado con ese ID' }] });
    res.status(200).json({ ok: true, data: estado });
  } catch (error) {
    next(error);
  }
};

export const postEstado = async (req, res, next) => {
  try {
    const nuevo = await prisma.estado.create({ data: { descripcion: req.body.descripcion } });
    res.status(201).json({ ok: true, data: nuevo });
  } catch (error) {
    next(error);
  }
};

export const patchEstado = async (req, res, next) => {
  try {
    const exists = await prisma.estado.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Estado no encontrado', error: [{ type: 'not_found', title: 'Estado no encontrado', detail: 'No existe un estado con ese ID' }] });

    const data = {};
    if (req.body.descripcion !== undefined) data.descripcion = req.body.descripcion;

    const actualizado = await prisma.estado.update({ where: { id: req.params.id }, data });
    res.status(200).json({ ok: true, data: actualizado });
  } catch (error) {
    next(error);
  }
};

export const deleteEstado = async (req, res, next) => {
  try {
    const exists = await prisma.estado.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Estado no encontrado', error: [{ type: 'not_found', title: 'Estado no encontrado', detail: 'No existe un estado con ese ID' }] });
    await prisma.estado.delete({ where: { id: req.params.id } });
    res.status(200).json({ ok: true, message: 'Estado eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};