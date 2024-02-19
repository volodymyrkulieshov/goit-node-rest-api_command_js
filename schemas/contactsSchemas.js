const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com","ua", "net" ] },
    })
    .required(),
  phone: Joi.number().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com","ua", "net" ] },
  }).required(),

  phone: Joi.number().required(),
});

module.exports = { createContactSchema, updateContactSchema };
