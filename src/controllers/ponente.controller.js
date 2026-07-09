import prisma from '../lib/prisma.js';

export const getPonentes = async (req, res, next) => {
  try {
    const { sector } = req.query;

    let ponentes;
    if (sector) {
      ponentes = await prisma.$queryRaw`
        SELECT * FROM ponentes
        WHERE sector ILIKE ${'%' + sector + '%'}
      `;
    } else {
      ponentes = await prisma.ponente.findMany();
    }

    res.status(200).json({ ok: true, data: ponentes });
  } catch (error) {
    next(error);
  }
};

export const getPonente = async (req, res, next) => {
  try {
    const ponente = await prisma.ponente.findUnique({ where: { id: req.params.id } });

    if (!ponente)
      return res.status(404).json({ ok: false, message: 'Ponente no encontrado', error: [{ type: 'not_found', title: 'Ponente no encontrado', detail: 'No existe un ponente con ese ID' }] });

    res.status(200).json({ ok: true, data: ponente });
  } catch (error) {
    next(error);
  }
};

export const postPonente = async (req, res, next) => {
  try {
    const { nombrePonente, docuIdentificacion, email, sector, telefono, empresa, cargo } = req.body;
    const fotoLink = req.file ? req.file.path : null;

    const nuevo = await prisma.ponente.create({
      data: {
        nombrePonente,
        docuIdentificacion: docuIdentificacion || '',
        email,
        sector: sector || '',
        telefono: telefono || '',
        fotoLink,
        cvLink: null,
        empresa: empresa || '',
        cargo: cargo || '',
      },
    });

    res.status(201).json({ ok: true, data: nuevo });
  } catch (error) {
    if (error.code === 'P2002')
      return res.status(409).json({ ok: false, message: 'El email ya está registrado', error: [{ type: 'unique_violation', title: 'Email duplicado', detail: 'El email proporcionado ya está en uso' }] });
    next(error);
  }
};

export const patchPonente = async (req, res, next) => {
  try {
    const exists = await prisma.ponente.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Ponente no encontrado', error: [{ type: 'not_found', title: 'Ponente no encontrado', detail: 'No existe un ponente con ese ID' }] });

    const { nombrePonente, docuIdentificacion, email, sector, telefono, empresa, cargo } = req.body;
    const fotoLink = req.file ? req.file.path : undefined;

    const data = {};
    if (nombrePonente !== undefined) data.nombrePonente = nombrePonente;
    if (docuIdentificacion !== undefined) data.docuIdentificacion = docuIdentificacion;
    if (email !== undefined) data.email = email;
    if (sector !== undefined) data.sector = sector;
    if (telefono !== undefined) data.telefono = telefono;
    if (empresa !== undefined) data.empresa = empresa;
    if (cargo !== undefined) data.cargo = cargo;
    if (fotoLink !== undefined) data.fotoLink = fotoLink;

    const actualizado = await prisma.ponente.update({
      where: { id: req.params.id },
      data,
    });

    res.status(200).json({ ok: true, data: actualizado });
  } catch (error) {
    if (error.code === 'P2002')
      return res.status(409).json({ ok: false, message: 'El email ya está registrado', error: [{ type: 'unique_violation', title: 'Email duplicado', detail: 'El email proporcionado ya está en uso' }] });
    next(error);
  }
};

export const deletePonente = async (req, res, next) => {
  try {
    const exists = await prisma.ponente.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Ponente no encontrado', error: [{ type: 'not_found', title: 'Ponente no encontrado', detail: 'No existe un ponente con ese ID' }] });

    await prisma.ponente.delete({ where: { id: req.params.id } });

    res.status(200).json({ ok: true, message: 'Ponente eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
