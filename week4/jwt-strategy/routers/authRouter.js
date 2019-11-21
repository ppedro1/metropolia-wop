const Router = require('express').Router()
const passport = require('passport')
const authController = require('../controllers/authController')

Router.post('/login', authController.login)

module.exports = Router