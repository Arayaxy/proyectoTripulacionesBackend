export const notFoundHandler = (req, res) => {
  const error = new Error(`La ruta solicitada [${req.method} ${req.originalUrl}] no existe.`);

  res.status(404).json({
    message: error.message
  });
};
