const Joi = require("joi");

module.exports = {
  createUser: {
    body: Joi.object({
      _id: Joi.forbidden(),
      email: Joi.string().required(),
      phoneNumber: Joi.string()
        .regex(/^[0-9]+$/)
        .min(10),
      firstName: Joi.string()
        .required()
        .regex(/^[a-zA-Z]+$/),
      lastName: Joi.string()
        .required()
        .regex(/^[a-zA-Z]+$/),
      status: Joi.forbidden(),
      password: Joi.string().required(),
    }),
  },
  updateUser: {
    body: Joi.object({
      _id: Joi.forbidden(),
      email: Joi.string().required(),
      phoneNumber: Joi.string()
        .regex(/^[0-9]+$/)
        .min(10),
      firstName: Joi.string()
        .required()
        .regex(/^[a-zA-Z]+$/),
      lastName: Joi.string()
        .required()
        .regex(/^[a-zA-Z]+$/),
      status: Joi.forbidden(),
    }),
  },
  createCompany: {
    body: Joi.object({
      _id: Joi.forbidden(),
      email: Joi.string().required(),
      serviceName: Joi.string().required(),
      phoneNumber: Joi.string()
        .regex(/^[0-9]+$/)
        .min(10),
      companyName: Joi.string()
        .required()
        .regex(/^[a-zA-Z]+$/),
      status: Joi.forbidden(),
      password: Joi.string().required(),
    }),
  },
  login: {
    body: Joi.object({
      _id: Joi.forbidden(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};
