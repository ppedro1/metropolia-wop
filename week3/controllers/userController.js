const { check, validationResult } = require('express-validator')
const userModel = require('../models/userModel')

const getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers()
        res.status(200).json(users)
    } catch(e) {
        console.log(e)
    }
    
}

const getUser = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id)
        res.status(200).json(user)
    } catch (e) {
        console.log('error', e)
    }
    
}

const addUser = async (req, res) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {

        const userObject = {
            name: req.body.name,
            password: req.body.passwd,
            email: req.body.email || ''
        }

        try {
            await userModel.addUser(userObject)
            delete userObject.password
            res.status(200).json(userObject)
        } catch (e) {
            console.log('error', e)
        }
    } else {
         return res.status(422).json({
             validationErrors: errors.array()
         })
    }
}

const editUser = async (req, res) => {
    const newUserData = {
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
    }

    try {
        await userModel.editUser(req.params.id)
        res.status(200).json(newUserData)
    } catch (e) {
        console.log('error', e)
    }
}

const deleteUser = async (req, res) => {
    console.log('deleteUser', req.params.id)
    try {
        await userModel.deleteUser(req.params.id)
        res.status(200).json({
            msg: `User with user_id ${req.params.id} deleted`
        })
    } catch (e) {
        console.log('error', e)
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    editUser,
    deleteUser
}