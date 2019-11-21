const passport = require('passport')
const Strategy = require('passport-local').Strategy
const userModel = require('../models/userModel')

passport.use(new Strategy(
    async (username, password, done) => {
        const params = [username, password]
        try {
            const [user] = await userModel.getUserLogin(params)
            if (typeof user === 'undefined') {
                return done(null, false, { message: 'Incorrect email or password' })
            } else {
                return done(null, { ...user }, { message: 'Login succesfull' })
            }
        } catch (e) {
            return done(e)
        }
    }
))

module.exports = passport