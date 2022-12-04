import { Router } from 'express';
import {
  findUsers,
  findUserById,
  updateUserProfile,
  updateUserAvatar,
  findCurrentUser,
} from '../controllers/users.js';
import { celebrateParamsRouteId, celebrateBodyAvatarRequired, celebrateBodyProfileRequired } from '../validators/users.js';

export const userRoutes = Router();

userRoutes.get('/', findUsers);
userRoutes.patch('/me', celebrateBodyProfileRequired, updateUserProfile);
userRoutes.get('/me', findCurrentUser);
userRoutes.patch('/me/avatar', celebrateBodyAvatarRequired, updateUserAvatar);
userRoutes.get('/:id', celebrateParamsRouteId, findUserById);
