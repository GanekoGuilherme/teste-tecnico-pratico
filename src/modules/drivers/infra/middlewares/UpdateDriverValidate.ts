import { celebrate, Joi, Segments } from "celebrate";

const updateDriverValidate = celebrate({
  [Segments.PARAMS]: {
    _id: Joi.string().required(),
  },
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
});

export default updateDriverValidate;
