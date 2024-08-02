const Joi = require("joi");

module.exports = {
  createPump: {
    body: Joi.object({
      pumpName: Joi.string().required(),
      fuel: Joi.string().required(), // Assuming it's an ObjectId, so it's validated as a string
      manual: Joi.number().required(),
      digital: Joi.number().required(),
      status: Joi.string().valid("idle", "active", "maintenance").default("idle"),
      createdAt: Joi.forbidden(),
      updatedAt: Joi.forbidden(),
    }),
  },

  updatePump: {
    body: Joi.object({
      pumpName: Joi.string().required(),
      fuel: Joi.string().required(), // Assuming it's an ObjectId, so it's validated as a string
      manual: Joi.number().required(),
      digital: Joi.number().required(),
      status: Joi.string().valid("idle", "active", "maintenance").default("idle"),
      createdAt: Joi.forbidden(),
      updatedAt: Joi.forbidden(),
    }),
  },
};
