const Joi = require('joi')

const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .required(),

  confirmation: Joi.valid(Joi.ref('password')).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

module.exports = userSchema
