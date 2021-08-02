const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = new Schema({
  name: { type: String },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  passwordHash: { type: String }
}, { timestamps: true })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash
    delete returnedObject.__v
  }
})
const User = model('user', userSchema)
userSchema.plugin(uniqueValidator)

module.exports = User
