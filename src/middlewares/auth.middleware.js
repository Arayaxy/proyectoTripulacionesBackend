import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const validarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ ok: false, msg: 'Acceso denegado, token requerido' });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, msg: 'Token invalido' });
  }
};
