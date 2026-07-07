import { Router } from 'express';
import { uploadFile } from '../controllers/upload.controller.js';
import { uploadFile as uploadMiddleware } from '../middlewares/upload.middleware.js';
import { verifyAdmin } from '../middlewares/auth.middleware.js';

export const uploadRouter = Router();

uploadRouter.post('/', verifyAdmin, uploadMiddleware, uploadFile);
