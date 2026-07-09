import { validationResult } from 'express-validator';

export const validateInputs = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      message: 'Error de validación',
      errors: errors.mapped(),
    });
  }

  return next();
};