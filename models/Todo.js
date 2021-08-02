const { model, Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const todoSchema = new Schema({
  title: { type: String },
  complete: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId }
}, { timestamps: true })

todoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    returnedObject.id = returnedObject._id
    delete returnedObject._id
  }
})
const Todo = model('todo', todoSchema)
todoSchema.plugin(uniqueValidator)

module.exports = Todo
