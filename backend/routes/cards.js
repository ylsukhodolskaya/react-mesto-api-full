import { Router } from 'express';
import {
  createCard,
  findCards,
  deleteCard,
  likeCard,
  dislikeCard,
  findCardById,
} from '../controllers/cards.js';
import { celebrateBodyCard, celebrateParamsRouteId } from '../validators/cards.js';

export const cardRoutes = Router();

cardRoutes.post('/', celebrateBodyCard, createCard);
cardRoutes.get('/', findCards);
cardRoutes.get('/:cardId', findCardById);
cardRoutes.delete('/:cardId', celebrateParamsRouteId, deleteCard);
cardRoutes.put('/:cardId/likes', celebrateParamsRouteId, likeCard);
cardRoutes.delete('/:cardId/likes', celebrateParamsRouteId, dislikeCard);
