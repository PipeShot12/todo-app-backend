const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8080
const errorHandler = require('./middlewares/errorHandler')
const notFound = require('./middlewares/notFound')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const todoRouter = require('./controllers/todo')
require('./utils/database')

const corsOptions = {
  origin: 'https://zen-hugle-0fb0a6.netlify.app',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/login', loginRouter)
app.use('/api/v1/todos', todoRouter)

app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server on ${PORT}`)
})
