import prisma from '../lib/prisma.js';

const DEFAULTS = {
  precioUbicacion: 0,
  precioCatering: 0,
  precioAudiovisuales: 0,
  precioOtros: 0,
};

export const getPresupuestos = async (req, res, next) => {
  try {
    const { estadoPresupuesto } = req.query;
    const where = {};
    if (estadoPresupuesto !== undefined) where.estadoPresupuesto = estadoPresupuesto === 'true';
    const presupuestos = await prisma.presupuesto.findMany({ where });
    res.status(200).json({ ok: true, data: presupuestos });
  } catch (error) {
    next(error);
  }
};

export const getPresupuesto = async (req, res, next) => {
  try {
    const presupuesto = await prisma.presupuesto.findUnique({ where: { id: req.params.id } });
    if (!presupuesto)
      return res.status(404).json({ ok: false, message: 'Presupuesto no encontrado', error: [{ type: 'not_found', title: 'Presupuesto no encontrado', detail: 'No existe un presupuesto con ese ID' }] });
    res.status(200).json({ ok: true, data: presupuesto });
  } catch (error) {
    next(error);
  }
};

export const postPresupuesto = async (req, res, next) => {
  try {
    const data = { ...req.body };
    for (const [key, val] of Object.entries(DEFAULTS)) {
      if (data[key] === undefined) data[key] = val;
    }
    if (!data.fecha) data.fecha = new Date();
    else data.fecha = new Date(data.fecha);

    const nuevo = await prisma.presupuesto.create({ data });
    res.status(201).json({ ok: true, data: nuevo });
  } catch (error) {
    next(error);
  }
};

export const patchPresupuesto = async (req, res, next) => {
  try {
    const exists = await prisma.presupuesto.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Presupuesto no encontrado', error: [{ type: 'not_found', title: 'Presupuesto no encontrado', detail: 'No existe un presupuesto con ese ID' }] });

    const data = {};
    const fields = [
      'estadoPresupuesto', 'total', 'fecha',
      'notaUbicacion', 'precioUbicacion',
      'catering', 'notaCatering', 'precioCatering',
      'audiovisuales', 'notaAudiovisuales', 'precioAudiovisuales',
      'otros', 'notaOtros', 'precioOtros',
      'observaciones',
    ];
    for (const field of fields) {
      if (req.body[field] !== undefined) {
        data[field] = field === 'fecha' ? new Date(req.body[field]) : req.body[field];
      }
    }

    const actualizado = await prisma.presupuesto.update({ where: { id: req.params.id }, data });
    res.status(200).json({ ok: true, data: actualizado });
  } catch (error) {
    next(error);
  }
};

export const deletePresupuesto = async (req, res, next) => {
  try {
    const exists = await prisma.presupuesto.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Presupuesto no encontrado', error: [{ type: 'not_found', title: 'Presupuesto no encontrado', detail: 'No existe un presupuesto con ese ID' }] });
    await prisma.presupuesto.delete({ where: { id: req.params.id } });
    res.status(200).json({ ok: true, message: 'Presupuesto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};