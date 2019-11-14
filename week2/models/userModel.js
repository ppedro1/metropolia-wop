'use strict';
const pool = require('../database/db')
const dbPromise = pool.promise()

const addUser = async (userObject) => {
    try {
        await dbPromise.query('INSERT INTO wop_user (name, password, email) VALUES (?, ?, ?)', [userObject.name, userObject.password, userObject.email])
    } catch (e) {
        console.log('error: ', e)
    }
}

const getAllUsers = async () => {
    try {
        const [request] = await dbPromise.query('SELECT user_id, name, email FROM wop_user')
        return request
    } catch (e) {
        console.log('error: ', e)
    }
}

const getUserById = async (id) => {
    try {
        const [request] = await dbPromise.query('SELECT user_id, name, email FROM wop_user WHERE user_id = ?', [id])
        return request[0]
    } catch (e) {
        console.log('error: ', e)
    }
}

const editUser = async (userObject) => {
    try {
        await dbPromise.query(
            'UPDATE wop_user SET name = ?, email = ? WHERE user_id = ?',
            [userObject.name, userObject.email, userObject.id]
        )
    } catch (e) {
        console.log('error', e)
    }
}

const deleteUser = async (id) => {
    try {
        await dbPromise.query('DELETE FROM wop_user WHERE user_id = ?', [id])
    } catch (e) {
        console.log('error', e)
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser
}