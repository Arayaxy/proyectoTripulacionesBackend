import * as Evento from '../models/evento.model.js';

export const getEventos = async (req, res) => {
  try {
    const eventos = await Evento.getAll();
    res.status(200).json({ ok: true, msg: 'Has realizado la obtencion de todos los eventos', data: { eventos } });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error al obtener eventos' });
  }
};

export const getEventoById = async (req, res) => {
  try {
    const evento = await Evento.getById(req.params.id);
    if (!evento)
      return res.status(404).json({ ok: false, msg: 'Evento no encontrado' });
    res.status(200).json({ ok: true, msg: 'Has realizado la busqueda del evento', data: { evento } });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error al obtener el evento' });
  }
};

export const createEvento = async (req, res) => {
  try {
    const evento = await Evento.create(req.body);
    res.status(201).json({ ok: true, msg: 'Has realizado la creacion del evento', data: { evento } });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error al crear el evento' });
  }
};

export const updateEvento = async (req, res) => {
  try {
    const evento = await Evento.update(req.body.id, req.body);
    if (!evento)
      return res.status(404).json({ ok: false, msg: 'Evento no encontrado' });
    res.status(200).json({ ok: true, msg: 'Has realizado la actualizacion del evento', data: { evento } });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error al actualizar el evento' });
  }
};

export const deleteEvento = async (req, res) => {
  try {
    const evento = await Evento.remove(req.body.id);
    if (!evento)
      return res.status(404).json({ ok: false, msg: 'Evento no encontrado' });
    res.status(200).json({ ok: true, msg: 'Has realizado la eliminacion del evento' });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error al eliminar el evento' });
  }
};
