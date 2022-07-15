import { celebrate, Joi, Segments } from "celebrate";

const createDriverValidate = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
});

export default createDriverValidate;
