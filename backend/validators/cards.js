import { Joi, Segments } from 'celebrate';
import { celebrate, schemaObjectId } from './common.js';
import { urlRegex } from '../models/card.js';

export const schemaRouteId = schemaObjectId;
export const schemaName = Joi.string().min(2).max(30).required();
export const schemaLink = Joi.string().regex(urlRegex).required();

export const schemaObjectRouteId = Joi.object({
  cardId: schemaRouteId.required(),
}).required();
export const schemaObjectCard = Joi.object({
  name: schemaName,
  link: schemaLink,
}).required();

export const segmentBodyCard = { [Segments.BODY]: schemaObjectCard };
export const segmentParamsRouteMe = { [Segments.PARAMS]: schemaObjectRouteId };

export const celebrateBodyCard = celebrate(segmentBodyCard);
export const celebrateParamsRouteId = celebrate(segmentParamsRouteMe);
