import prisma from '../lib/prisma.js';

export const getPonencias = async (req, res, next) => {
  try {
    const { idPonente } = req.query;
    const where = idPonente ? { idPonente } : {};
    const ponencias = await prisma.ponencia.findMany({ where });
    res.status(200).json({ ok: true, data: ponencias });
  } catch (error) {
    next(error);
  }
};

export const getPonencia = async (req, res, next) => {
  try {
    const ponencia = await prisma.ponencia.findUnique({ where: { id: req.params.id } });
    if (!ponencia)
      return res.status(404).json({ ok: false, message: 'Ponencia no encontrada', error: [{ type: 'not_found', title: 'Ponencia no encontrada', detail: 'No existe una ponencia con ese ID' }] });
    res.status(200).json({ ok: true, data: ponencia });
  } catch (error) {
    next(error);
  }
};

export const postPonencia = async (req, res, next) => {
  try {
    const {
      nombreHotel, notaTransporte, horarioIdaTransporte, horarioVueltaTransporte,
      localizacionHotel, horarioPonencia, checkinHorario, ponenteEstado,
      presentacionLink, billeteIdaLink, billeteVueltaLink, tipoPonencia, idPonente,
    } = req.body;

    const nueva = await prisma.ponencia.create({
      data: {
        nombreHotel,
        localizacionHotel,
        horarioPonencia: new Date(horarioPonencia),
        ponenteEstado,
        tipoPonencia,
        idPonente,
        notaTransporte: notaTransporte || null,
        horarioIdaTransporte: horarioIdaTransporte ? new Date(horarioIdaTransporte) : null,
        horarioVueltaTransporte: horarioVueltaTransporte ? new Date(horarioVueltaTransporte) : null,
        checkinHorario: checkinHorario ? new Date(checkinHorario) : new Date(),
        presentacionLink: presentacionLink || null,
        billeteIdaLink: billeteIdaLink || null,
        billeteVueltaLink: billeteVueltaLink || null,
      },
    });
    res.status(201).json({ ok: true, data: nueva });
  } catch (error) {
    if (error.code === 'P2003')
      return res.status(400).json({ ok: false, message: 'El idPonente no existe', error: [{ type: 'foreign_key', title: 'Referencia inválida', detail: 'El idPonente proporcionado no existe' }] });
    next(error);
  }
};

export const patchPonencia = async (req, res, next) => {
  try {
    const exists = await prisma.ponencia.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Ponencia no encontrada', error: [{ type: 'not_found', title: 'Ponencia no encontrada', detail: 'No existe una ponencia con ese ID' }] });

    const {
      nombreHotel, notaTransporte, horarioIdaTransporte, horarioVueltaTransporte,
      localizacionHotel, horarioPonencia, checkinHorario, ponenteEstado,
      presentacionLink, billeteIdaLink, billeteVueltaLink, tipoPonencia, idPonente,
    } = req.body;

    const data = {};
    if (nombreHotel !== undefined) data.nombreHotel = nombreHotel;
    if (notaTransporte !== undefined) data.notaTransporte = notaTransporte || null;
    if (horarioIdaTransporte !== undefined) data.horarioIdaTransporte = new Date(horarioIdaTransporte);
    if (horarioVueltaTransporte !== undefined) data.horarioVueltaTransporte = new Date(horarioVueltaTransporte);
    if (localizacionHotel !== undefined) data.localizacionHotel = localizacionHotel;
    if (horarioPonencia !== undefined) data.horarioPonencia = new Date(horarioPonencia);
    if (checkinHorario !== undefined) data.checkinHorario = new Date(checkinHorario);
    if (ponenteEstado !== undefined) data.ponenteEstado = ponenteEstado;
    if (presentacionLink !== undefined) data.presentacionLink = presentacionLink || null;
    if (billeteIdaLink !== undefined) data.billeteIdaLink = billeteIdaLink || null;
    if (billeteVueltaLink !== undefined) data.billeteVueltaLink = billeteVueltaLink || null;
    if (tipoPonencia !== undefined) data.tipoPonencia = tipoPonencia;
    if (idPonente !== undefined) data.idPonente = idPonente;

    const actualizada = await prisma.ponencia.update({ where: { id: req.params.id }, data });
    res.status(200).json({ ok: true, data: actualizada });
  } catch (error) {
    if (error.code === 'P2003')
      return res.status(400).json({ ok: false, message: 'El idPonente no existe', error: [{ type: 'foreign_key', title: 'Referencia inválida', detail: 'El idPonente proporcionado no existe' }] });
    next(error);
  }
};

export const deletePonencia = async (req, res, next) => {
  try {
    const exists = await prisma.ponencia.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Ponencia no encontrada', error: [{ type: 'not_found', title: 'Ponencia no encontrada', detail: 'No existe una ponencia con ese ID' }] });
    await prisma.ponencia.delete({ where: { id: req.params.id } });
    res.status(200).json({ ok: true, message: 'Ponencia eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};