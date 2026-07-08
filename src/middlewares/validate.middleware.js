import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      message: 'Error de validacion',
      details: errors.array().map(e => ({
        path: e.path,
        type: 'field',
        title: e.msg,
        detail: e.msg,
      }))
    });
  }

  next();
};
