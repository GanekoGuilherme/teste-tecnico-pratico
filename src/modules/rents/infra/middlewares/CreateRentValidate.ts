import { celebrate, Joi, Segments } from "celebrate";

const createRentValidate = celebrate({
  [Segments.BODY]: {
    carId: Joi.string().required(),
    driverId: Joi.string().required(),
    reason: Joi.string().required(),
  },
});

export default createRentValidate;
