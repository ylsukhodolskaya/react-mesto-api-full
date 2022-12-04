import { Joi, Segments } from 'celebrate';
import {
  celebrate,
  schemaObjectId,
  schemaURL,
} from './common.js';
import { urlRegex } from '../models/card.js';

export const schemaAvatar = schemaURL.regex(urlRegex);
export const schemaEmail = Joi.string().email().required();
const schemaPassword = Joi.string().required();
// необязательные поля без required
const schemaName = Joi.string().min(2).max(30);
const schemaAbout = Joi.string().min(2).max(30);

const schemaObjectRouteId = Joi.object({
  id: schemaObjectId.required(),
}).required();
const schemaObjectProfile = Joi.object({
  name: schemaName,
  about: schemaAbout,
}).required();
const schemaObjectProfileRequired = Joi.object({
  name: schemaName.required(),
  about: schemaAbout.required(),
}).required();
const schemaObjectAvatar = Joi.object({
  avatar: schemaAvatar,
}).required();
const schemaObjectAvatarRequired = Joi.object({
  avatar: schemaAvatar.required(),
}).required();
const schemaObjectAuth = Joi.object({
  email: schemaEmail,
  password: schemaPassword,
}).required();
const schemaObjectUser = schemaObjectAuth // объединяем несколько схем в одну
  .concat(schemaObjectProfile)
  .concat(schemaObjectAvatar);

const segmentBodyAuth = { [Segments.BODY]: schemaObjectAuth };
const segmentBodyUser = { [Segments.BODY]: schemaObjectUser };
const segmentBodyAvatarRequired = { [Segments.BODY]: schemaObjectAvatarRequired };
const segmentParamsRouteId = { [Segments.PARAMS]: schemaObjectRouteId };
const segmentBodyProfileRequired = { [Segments.BODY]: schemaObjectProfileRequired };

export const celebrateBodyAuth = celebrate(segmentBodyAuth);
export const celebrateBodyUser = celebrate(segmentBodyUser);
export const celebrateBodyAvatarRequired = celebrate(segmentBodyAvatarRequired);
export const celebrateParamsRouteId = celebrate(segmentParamsRouteId);
export const celebrateBodyProfileRequired = celebrate(segmentBodyProfileRequired);
