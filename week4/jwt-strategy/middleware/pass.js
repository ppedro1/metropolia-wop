require('dotenv').config()
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const JWTExtract = require('passport-jwt').ExtractJwt
const userModel = require('../models/userModel')

passport.use(new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (username, password, done) => {
        const params = [username, password]
        console.log('params ', params)
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

passport.use(new JWTStrategy({
        jwtFromRequest: JWTExtract.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET
    },
    async (jwtpayload, done) => {
        try {
            const user = await userModel.getUserById(jwtpayload.user_id)
            return done(null, user)
        } catch (e) {
            return done(e)
        }
    }
))

module.exports = passport