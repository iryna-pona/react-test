import { Joi, Segments } from "celebrate";

export const getUserByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string()
      .length(24)
      .hex()
      .required()
      .messages({
        "string.base": "ID користувача має бути рядком",
        "string.length": "ID користувача повинен містити 24 символи",
        "string.hex": "ID користувача має бути валідним hex",
        "any.required": "ID користувача обов'язковий",
      }),
  }),
};