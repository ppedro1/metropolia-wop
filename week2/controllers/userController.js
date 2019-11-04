'use strict'

const userModel = require('../models/userModel')
const users = userModel.users


// add user if information is valid and return 400 if not
const addUser = (req, res) => {
    if (req.body.name.length > 4 && req.body.passwd.length > 4) {
        const newId = Math.floor(Math.random() * 12356)
        const userJSON = {
            id: `${newId}`,
            username: req.body.name,
            password: req.body.passwd,
            email: req.body.email || ''
        }

        users.push(userJSON)

        delete userJSON.password

        res.status(200).json(userJSON)
    } else {
        res.status(400).json({
            'error': 'Username or password too short (min 4 characters)'
        })
    }
}
// get all users
const getUsers = (req, res) => {
    let returnUsers = users
    users.forEach(user => {
        delete user.password
    })
    res.send(returnUsers)
}

// get an user by id (string) and return 404 if not found
const getUser = (req, res) => {
    const userById = users.find(a => a.id === req.params.id)
    if (typeof userById !== 'undefined') {
        delete userById.password
        res.status(200).json(userById)
    } else {
        res.status(404).json({
            'error': `no user with id ${ req.params.id } found`
        })
    }
}

module.exports = {
    addUser,
    getUsers,
    getUser
}