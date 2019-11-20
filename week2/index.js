const PORT = 3000

const express = require('express')
const app = express()
const cors = require('cors')

const middleware = require('./middleware/middleware')

// Define app extensions
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.requestLogger)

// Import routers
const userRouter = require('./routers/userRouter')
const catRouter = require('./routers/catRouter')

app.use('/cat', catRouter)
app.use('/user', userRouter)


app.listen(PORT, () => {
    console.log('API listening to port ' + PORT)
})