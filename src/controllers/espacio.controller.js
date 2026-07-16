import {
  findEspacios,
  findEspacioById,
  createEspacio,
  updateEspacio,
  removeEspacio,
  findEspaciosByCapacidad,
} from '../services/espacio.service.js';
import { mapPrismaError } from '../lib/prismaErrors.js';

export const getEspacios = async (req, res, next) => {
  try {
    const { ciudad } = req.query;

    const espacios = await findEspacios({
      includeSalas: true,
      where: {
        ciudad: { contains: ciudad, mode: 'insensitive' },
      },
    });
    res.json({ ok: true, data: espacios, meta: { total: espacios.length } });
  } catch (err) { next(err); }
};

export const getEspacio = async (req, res, next) => {
  try {
    const includeSalas = req.query.withSalas !== 'false';
    const espacio = await findEspacioById(req.params.id, { includeSalas });
    if (!espacio) {
      const err = new Error('Espacio no encontrado');
      err.status = 404;
      return next(err);
    }
    res.json({ ok: true, data: espacio });
  } catch (err) { next(err); }
};

export const postEspacio = async (req, res, next) => {
  try {
    const espacio = await createEspacio(req.body);
    res.status(201).json({ ok: true, data: espacio });
  } catch (err) { next(mapPrismaError(err)); }
};

export const patchEspacio = async (req, res, next) => {
  try {
    const { salas, ...espacioData } = req.body;
    const espacio = await updateEspacio(req.params.id, espacioData);
    res.json({ ok: true, data: espacio });
  } catch (err) { next(mapPrismaError(err)); }
};

export const deleteEspacio = async (req, res, next) => {
  try {
    const deleted = await removeEspacio(req.params.id);
    res.json({ ok: true, data: deleted, message: 'Espacio eliminado' });
  } catch (err) { next(mapPrismaError(err)); }
};

export const getEspaciosByCapacidad = async (req, res, next) => {
  try {
    const min = parseInt(req.query.min) || 0;
    const max = parseInt(req.query.max) || 999999;
    const [espacios, salas] = await findEspaciosByCapacidad(min, max);
    res.json({ ok: true, data: { espacios, salas } });
  } catch (err) { next(err); }
};
