'use strict'

const Router = require('express').Router()
const userController = require('../controllers/userController')

Router.get('/', userController.getUsers)
Router.post('/', userController.addUser)
Router.get('/:id', userController.getUser)

module.exports = Router