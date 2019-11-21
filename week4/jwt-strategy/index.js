const PORT = 3000

const express = require('express')
const app = express()
const cors = require('cors')

const middleware = require('./middleware/middleware')
const passport = require('./middleware/pass')

// Define app extensions
app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.requestLogger)

// Import routers
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const catRouter = require('./routers/catRouter')

app.use('/auth', authRouter)
app.use('/cat', passport.authenticate('jwt', { session: false }), catRouter)
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter)


app.listen(PORT, () => {
    console.log('API listening to port ' + PORT)
})