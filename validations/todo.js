const Joi = require('joi')

const todoSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required()
})

module.exports = todoSchema
