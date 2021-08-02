const todoRouter = require('express').Router()
const auth = require('../middlewares/auth')
const todoValidation = require('../validations/todo')
const Todo = require('../models/Todo')

todoRouter.get('/', auth, async (req, res, next) => {
  try {
    const { userId } = req
    const notes = await Todo.find({ userId: userId }).sort({ updatedAt: -1 })
    res.json(notes).status(200)
  } catch (err) {
    next(err)
  }
})
todoRouter.post('/', auth, async (req, res, next) => {
  try {
    const { userId } = req
    const { title } = await todoValidation.validateAsync({ ...req.body })
    const todo = new Todo({
      title,
      userId
    })
    const saveTodo = await todo.save()
    res.json(saveTodo)
  } catch (err) {
    next(err)
  }
})
todoRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const { userId } = req
    const { id } = req.params
    const deleteTodo = await Todo.findOneAndDelete({ $and: [{ userId: userId }, { _id: id }] })
    if (deleteTodo === null) return res.sendStatus(404)

    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
todoRouter.post('/delete-completed', auth, async (req, res, next) => {
  try {
    const { userId } = req
    const { todos } = req.body

    const deleteAllCompleted = await Todo.deleteMany({ $and: [{ userId: userId }, { _id: { $in: todos } }, { complete: true }] })
    if (deleteAllCompleted === null) return res.sendStatus(404)

    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
todoRouter.put('/:id', auth, async (req, res, next) => {
  try {
    const { userId } = req
    const { id } = req.params
    const { complete } = req.body
    const newInfo = {
      complete: complete
    }
    const updateTodo = await Todo.findOneAndUpdate({ $and: [{ userId: userId }, { _id: id }] }, newInfo, { new: true })
    res.json(updateTodo)
  } catch (err) {
    next(err)
  }
})
module.exports = todoRouter
