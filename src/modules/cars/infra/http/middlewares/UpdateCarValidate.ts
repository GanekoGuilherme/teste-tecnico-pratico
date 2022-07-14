import { celebrate, Joi, Segments } from "celebrate";

const updateCarValidate = celebrate({
  [Segments.PARAMS]: {
    _id: Joi.string().required(),
  },
  [Segments.BODY]: {
    licensePlate: Joi.string().regex(
      /([A-Z]{3}[0-9]{4})|([A-Z]{3}[0-9][A-Z][0-9]{2})/
    ),
    color: Joi.string().required(),
    brand: Joi.string().required(),
  },
});

export default updateCarValidate;
