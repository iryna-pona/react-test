import { Joi, Segments } from "celebrate";

export const getTravellersSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.base": "Номер сторінки повинен бути числом",
      "number.integer": "Номер сторінки повинен бути цілим числом",
      "number.min": "Номер сторінки не може бути меншим за {#limit}",
    }),

    limit: Joi.number().integer().min(1).max(50).default(12).messages({
      "number.base": "Кількість записів повинна бути числом",
      "number.integer": "Кількість записів повинна бути цілим числом",
      "number.min": "Кількість записів не може бути меншою за {#limit}",
      "number.max": "Кількість записів не може перевищувати {#limit}",
    }),
  }),
};