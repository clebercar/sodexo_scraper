import { celebrate, Segments, Joi } from 'celebrate';
import validator from 'cpf-cnpj-validator';

const joi = Joi.extend(validator);

export default celebrate({
  [Segments.BODY]: {
    password: joi.string().required(),
    cpf: joi.document().cpf().required(),
  },
});
