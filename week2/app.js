const express = require('express')
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware.js')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.requestLogger)

const catModule = require('./models/catModel')
const catRouter = require('./routes/catRoute')
const userRouter = require('./routes/userRoute')

app.use('/cat', catRouter)
app.use('/user', userRouter)


app.listen(port, () => console.log(`Listening on port: ${port}!`));
