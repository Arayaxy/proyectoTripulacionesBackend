export const notFoundHandler = (req, res) => {
  const msg = `La ruta solicitada [${req.method} ${req.originalUrl}] no existe.`;

  res.status(404).json({
    ok: false,
    message: msg,
    error: [{ type: 'route', title: 'Ruta no encontrada', detail: msg }]
  });
};
