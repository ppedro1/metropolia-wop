require('dotenv').config()
const jwt = require('jsonwebtoken')
const passport = require('passport')

const login = (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(user)
        if (err || !user) {
            return res.status(400).json({
                error: 'sometin went wronk',
                user: user
            })
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err)
            }
        })

        const token = jwt.sign(user, process.env.SECRET)
        return res.json({ 
            user, 
            token 
        })
    })(req, res)
}

module.exports = {
    login
}