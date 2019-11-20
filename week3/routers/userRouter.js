const Router = require('express').Router()
const userController = require('../controllers/userController')
const { check, validationResult } = require('express-validator')

const ADD_USER_VALIDATOR = [
    check('name')
        .isLength({ min: 3 })
        .trim()
        .escape(),
    check('email')
        .isEmail()
        .isLength({ min: 8})
        .normalizeEmail(),
    check('passwd')
        .trim()
        .escape()
        .custom((value) => {
        const passwordRegExp = new RegExp("(?=.*[a-z])(?=.*[A-Z]).{8,}")
        return passwordRegExp.test(value)
    })
]

Router.get('/', userController.getUsers)
Router.get('/:id', userController.getUser)
Router.post('/', ADD_USER_VALIDATOR, userController.addUser)
Router.put('/:id', userController.editUser)
Router.delete('/:id', userController.deleteUser)

module.exports = Router