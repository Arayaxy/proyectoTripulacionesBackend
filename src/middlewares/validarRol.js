export const validarRol = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ ok: false, msg: 'No tienes permisos para esta accion' });
  }
  next();
};
