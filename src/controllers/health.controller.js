export const getHealth = (_req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.status(200).json({
    ok: true,
    msg: '¡Está vivo!'
  });
};
