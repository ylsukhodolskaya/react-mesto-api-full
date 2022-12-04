import { Router } from 'express';
import { userRoutes } from './users.js';
import { cardRoutes } from './cards.js';
import { authRouter } from './auth.js';
import { auth } from '../middlewares/auth.js';
import { NotFoundError } from '../errors/NotFoundError.js';

export const router = Router();

// Роутинг авторизации
router.use('/', authRouter);

router.use(auth);

// Вызываем роутинг пользователя
router.use('/users', userRoutes);

// Роутинг карточек
router.use('/cards', cardRoutes);

// Обработка нееправильного пути
router.all('/*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});
