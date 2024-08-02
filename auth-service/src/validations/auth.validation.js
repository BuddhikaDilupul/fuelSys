const Joi = require("joi");

module.exports = {
  createUser: {
    body: Joi.object({
      email: Joi.string().required(),
      username: Joi.string().required(),
      name: Joi.string().required(),
      phoneNumber: Joi.string()
        .regex(/^[0-9]+$/)
        .min(10)
        .required(),
      role: Joi.string().valid("PUMPER", "ADMIN", "MANAGER").required(),
      password: Joi.string().required(),
    }),
  },

  updateUser: {
    body: Joi.object({
      _id: Joi.forbidden(),
      email: Joi.string().required(),
      name: Joi.string().required(),
      username: Joi.string().required(),
      phoneNumber: Joi.string()
        .regex(/^[0-9]+$/)
        .min(10)
        .required(),
      role: Joi.string().valid("PUMPER", "ADMIN", "MANAGER").required(),
      status: Joi.forbidden(),
      createdAt: Joi.forbidden(),
      updatedAt: Joi.forbidden(),
    }),
  },

  login: {
    body: Joi.object({
      _id: Joi.forbidden(),
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};
