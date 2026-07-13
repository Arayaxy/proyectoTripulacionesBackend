import {
  findPonentes,
  findPonenteById,
  createPonente,
  updatePonente,
  removePonente,
} from '../services/ponente.service.js';
import { mapPrismaError } from '../lib/prismaErrors.js';

export const getPonentes = async (req, res, next) => {
  try {
    const { sector } = req.query;

    const ponentes = await findPonentes({
      includePonencias: true,
      where: {
        sector: { contains: sector, mode: 'insensitive' },
      },
    });
    res.json({ ok: true, data: ponentes, meta: { total: ponentes.length } });
  } catch (err) { next(err); }
};

export const getPonente = async (req, res, next) => {
  try {
    const ponente = await findPonenteById(req.params.id, { includePonencias: true });
    if (!ponente) {
      const err = new Error('Ponente no encontrado');
      err.status = 404;
      return next(err);
    }
    res.json({ ok: true, data: ponente });
  } catch (err) { next(err); }
};

export const postPonente = async (req, res, next) => {
  try {
    const ponente = await createPonente(req.body);
    res.status(201).json({ ok: true, data: ponente });
  } catch (err) { next(mapPrismaError(err)); }
};

export const patchPonente = async (req, res, next) => {
  try {
    const ponente = await updatePonente(req.params.id, req.body);
    res.json({ ok: true, data: ponente });
  } catch (err) { next(mapPrismaError(err)); }
};

export const deletePonente = async (req, res, next) => {
  try {
    const deleted = await removePonente(req.params.id);
    res.json({ ok: true, data: deleted, message: 'Ponente eliminado' });
  } catch (err) { next(mapPrismaError(err)); }
};
