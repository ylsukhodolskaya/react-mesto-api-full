import { Router } from 'express';
import { login, register } from '../controllers/users.js';
import { celebrateBodyAuth, celebrateBodyUser } from '../validators/users.js';

export const authRouter = Router();
authRouter.post('/signin', celebrateBodyAuth, login);
authRouter.post('/signup', celebrateBodyUser, register);
