import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  HTTP_CLIENT: Joi.required().default('axios'),
  MONGO_DB: Joi.required(),
  PORT: Joi.number().default(3000),
});
