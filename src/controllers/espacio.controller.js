import prisma from '../lib/prisma.js';

export const getEspacios = async (req, res, next) => {
  try {
    const { ciudad } = req.query;

    let espacios;
    if (ciudad) {
      espacios = await prisma.$queryRaw`
        SELECT * FROM espacios
        WHERE ciudad ILIKE ${'%' + ciudad + '%'}
      `;
    } else {
      espacios = await prisma.espacio.findMany();
    }

    res.status(200).json({ ok: true, data: espacios });
  } catch (error) {
    next(error);
  }
};

export const getEspacio = async (req, res, next) => {
  try {
    const espacio = await prisma.espacio.findUnique({ where: { id: req.params.id } });

    if (!espacio)
      return res.status(404).json({ ok: false, message: 'Espacio no encontrado', error: [{ type: 'not_found', title: 'Espacio no encontrado', detail: 'No existe un espacio con ese ID' }] });

    res.status(200).json({ ok: true, data: espacio });
  } catch (error) {
    next(error);
  }
};

export const postEspacio = async (req, res, next) => {
  try {
    const { nombreEspacio, ciudad, direccion, aforo, nota, telefonoContacto, nombreContacto, emailContacto } = req.body;

    const nuevo = await prisma.espacio.create({
      data: {
        nombreEspacio,
        ciudad: ciudad || '',
        direccion: direccion || '',
        aforo: parseInt(aforo, 10) || 0,
        nota: nota || null,
        telefonoContacto: telefonoContacto || '',
        nombreContacto: nombreContacto || '',
        emailContacto: emailContacto || '',
      },
    });

    res.status(201).json({ ok: true, data: nuevo });
  } catch (error) {
    next(error);
  }
};

export const patchEspacio = async (req, res, next) => {
  try {
    const exists = await prisma.espacio.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Espacio no encontrado' });

    const { nombreEspacio, ciudad, direccion, aforo, nota, telefonoContacto, nombreContacto, emailContacto } = req.body;

    const data = {};
    if (nombreEspacio !== undefined) data.nombreEspacio = nombreEspacio;
    if (ciudad !== undefined) data.ciudad = ciudad;
    if (direccion !== undefined) data.direccion = direccion;
    if (aforo !== undefined) data.aforo = parseInt(aforo, 10) || 0;
    if (nota !== undefined) data.nota = nota || null;
    if (telefonoContacto !== undefined) data.telefonoContacto = telefonoContacto;
    if (nombreContacto !== undefined) data.nombreContacto = nombreContacto;
    if (emailContacto !== undefined) data.emailContacto = emailContacto;

    const actualizado = await prisma.espacio.update({
      where: { id: req.params.id },
      data,
    });

    res.status(200).json({ ok: true, data: actualizado });
  } catch (error) {
    next(error);
  }
};

export const buscarPorCapacidad = async (req, res, next) => {
  try {
    const min = req.query.min ? parseInt(req.query.min, 10) : 0;
    const max = req.query.max ? parseInt(req.query.max, 10) : 999999;

    const [espacios, salas] = await Promise.all([
      prisma.$queryRaw`
        SELECT * FROM espacios
        WHERE CAST(aforo AS INTEGER) BETWEEN ${min} AND ${max}
        ORDER BY CAST(aforo AS INTEGER) DESC
      `,
      prisma.$queryRaw`
        SELECT s.*, e.nombre_espacio, e.aforo AS aforo_espacio
        FROM salas s
        JOIN espacios e ON e.id = s.id_espacio
        WHERE CAST(s.capacidad_max_sala AS INTEGER) BETWEEN ${min} AND ${max}
        ORDER BY CAST(s.capacidad_max_sala AS INTEGER) DESC
      `,
    ]);

    res.status(200).json({
      ok: true,
      data: {
        espacios,
        salas: salas.map(s => ({
          id: s.id,
          nombreSala: s.nombre_sala,
          tipoSala: s.tipo_sala,
          capacidadMaxSala: s.capacidad_max_sala,
          notaSala: s.nota_sala,
          idEspacio: s.id_espacio,
          espacio: {
            id: s.id_espacio,
            nombreEspacio: s.nombre_espacio,
            aforo: s.aforo_espacio,
          },
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEspacio = async (req, res, next) => {
  try {
    const exists = await prisma.espacio.findUnique({ where: { id: req.params.id } });
    if (!exists)
      return res.status(404).json({ ok: false, message: 'Espacio no encontrado', error: [{ type: 'not_found', title: 'Espacio no encontrado', detail: 'No existe un espacio con ese ID' }] });

    await prisma.espacio.delete({ where: { id: req.params.id } });

    res.status(200).json({ ok: true, message: 'Espacio eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
