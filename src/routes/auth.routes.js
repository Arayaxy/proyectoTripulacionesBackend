import { Router } from 'express';
import { getLogin, getLogout, verifySession, backdoorRegister, getAdmins, updateAdmin, deleteAdmin } from '../controllers/auth.controller.js';
import { authenticate, authorize, validateInputs } from '../middlewares/index.js';
import { loginValidation, backdoorValidation, updateAdminValidation } from '../validations/auth.validation.js';

export const authRouter = Router();

authRouter.post('/login', loginValidation, validateInputs, getLogin);
authRouter.get('/verify', authenticate, verifySession);
authRouter.post('/logout', getLogout);
authRouter.post('/backdoor', backdoorValidation, validateInputs, backdoorRegister);
authRouter.get('/admins', authenticate, authorize('admin'), getAdmins);
authRouter.patch('/admins/:email', authenticate, authorize('admin'), updateAdminValidation, validateInputs, updateAdmin);
authRouter.delete('/admins/:email', authenticate, authorize('admin'), deleteAdmin);
