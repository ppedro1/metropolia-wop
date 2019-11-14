'use strict'

const userModel = require('../models/userModel')

const addUser = async (req, res) => {
    console.log(req.body)
    const userObject = {
        name: req.body.name,
        password: req.body.passwd,
        email: req.body.email || ''
    }

    await userModel.addUser(userObject)

    delete userObject.password
    res.status(200).json(userObject)
}

const getUsers = async (req, res) => {
    const users = await userModel.getAllUsers()
    res.status(200).json(users)
}

const getUser = async (req, res) => {
    const user = await userModel.getUserById(req.params.id)
    res.status(200).json(user)
}

module.exports = {
    addUser,
    getUsers,
    getUser
}