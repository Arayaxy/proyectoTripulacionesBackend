import prisma from '../lib/prisma.js';

export const getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json({ ok: true, data: usuarios });
  } catch (error) {
    next(error);
  }
};

export const getUsuario = async (req, res, next) => {
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id: req.params.id } });
    if (!usuario)
      return res.status(404).json({ ok: false, message: 'Usuario no encontrado', error: [{ type: 'not_found', title: 'Usuario no encontrado', detail: 'No existe un usuario con ese ID' }] });
    res.status(200).json({ ok: true, data: usuario });
  } catch (error) {
    next(error);
  }
};

export const postUsuario = async (req, res, next) => {
  try {
    const nuevo = await prisma.usuario.create({ data: { nombreUsuario: req.body.nombreUsuario, rol: req.body.rol } });
    res.status(201).json({ ok: true, data: nuevo });
  } catch (error) {
    next(error);
  }
};

export const patchUsuario = async (req, res, next) => {
  try {
    const exists = await prisma.usuario.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Usuario no encontrado', error: [{ type: 'not_found', title: 'Usuario no encontrado', detail: 'No existe un usuario con ese ID' }] });

    const data = {};
    if (req.body.nombreUsuario !== undefined) data.nombreUsuario = req.body.nombreUsuario;
    if (req.body.rol !== undefined) data.rol = req.body.rol;

    const actualizado = await prisma.usuario.update({ where: { id: req.params.id }, data });
    res.status(200).json({ ok: true, data: actualizado });
  } catch (error) {
    next(error);
  }
};

export const deleteUsuario = async (req, res, next) => {
  try {
    const exists = await prisma.usuario.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Usuario no encontrado', error: [{ type: 'not_found', title: 'Usuario no encontrado', detail: 'No existe un usuario con ese ID' }] });
    await prisma.usuario.delete({ where: { id: req.params.id } });
    res.status(200).json({ ok: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};