const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// import routers
const catRouter = require('./routes/catRoute')
const userRouter = require('./routes/userRoute')
const uploadRouter = require('./routes/uploadRoute')

app.use('/cat', catRouter)
app.use('/user', userRouter)
app.use('/upload', uploadRouter)


app.listen(port, () => console.log(`Listening on port: ${port}!`));
