import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { getAuth } from 'firebase-admin/auth';

export const getLogin = async (req, res) => {

  const authHeader = req.headers.authorization;
  const firebaseToken = authHeader && authHeader.split(' ')[1];

  if (!firebaseToken) {
    return res.status(400).json({ ok: false, message: 'No Token Encontrado' });
  }

  try {

    const decodedFirebaseToken = await getAuth().verifyIdToken(firebaseToken);
    const { uid: userId, name, email } = decodedFirebaseToken;

    const userPayload = { userId, name, email, role: 'admin' };

    const token = jwt.sign(userPayload, env.jwtSecret, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 //7 dias
    });

    return res.json({
      ok: true,
      user: userPayload
    });

  } catch (error) {
    console.log(error);

    return res.status(401).json({
      ok: false,
      message: 'El token no es valido'
    });

  }
}

export const verifySession = async (req, res) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ ok: false, message: 'No esta logeado' });
  }

  try {

    const decoded = jwt.verify(token, env.jwtSecret);

    return res.json({
      ok: true,
      user: decoded
    });

  } catch (error) {
    return res.status(401).json({ ok: false, message: 'Session Invalida o Expirada' });
  }
};

export const getLogout = async (req, res) => {

  res.clearCookie('token');

  return res.json({
    ok: true,
    message: 'Session Cerrada!'
  });
};
