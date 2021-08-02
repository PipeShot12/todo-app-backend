const Joi = require('joi')

const loginSchema = Joi.object({
  userData: Joi.string()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .required()

})

module.exports = loginSchema
