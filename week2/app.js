const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const catModule = require('./models/catModel')
const catRouter = require('./routes/catRoute')
const userRouter = require('./routes/userRoute')

app.use('/cat', catRouter)
app.use('/user', userRouter)


app.listen(port, () => console.log(`Listening on port: ${port}!`));
