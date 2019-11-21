'use strict'
const pool = require('../database/db')
const dbPromise = pool.promise()

const addCat = async (catObject) => {
    console.log(catObject)
    try {
        const query = 'INSERT INTO wop_cat (name, age, weight, owner, filename) VALUES (?, ?, ?, ?, ?)'
        const inserts = [catObject.name, catObject.age, catObject.weight, catObject.owner, catObject.filename]

        await dbPromise.query(query, inserts)
    } catch (e) {
        console.log('error: ', e)
    }
}

const getAllCats = async () => {
    try {
        const [request] = await dbPromise.query('SELECT *, u.name FROM wop_cat JOIN user u ON ')
        return request
    } catch (e) {
        console.log('error: ', e)
    }
}

const getCatById = async (id) => {
    try {
        const [request] = await dbPromise.query('SELECT * FROM wop_cat WHERE cat_id = ?', [id])
        return request
    } catch (e) {
        console.log('error: ', e)
    }
}

const editCat = async (catObject) => {
    try {
        await dbPromise.query(
            'UPDATE wop_cat SET name = ?, age = ?, weight = ?, owner = ?, filename = ? WHERE cat_id = ?',
            [catObject.name, catObject.age, catObject.weight, catObject.owner, catObject.filename, catObject.id]
        )
    } catch (e) {
        console.log(e)
    }
}

const deleteCat = async (id) => {
    try {
        await dbPromise.query('DELETE FROM wop_cat WHERE cat_id = ?', [id])
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    addCat,
    getAllCats,
    getCatById,
    editCat,
    deleteCat
}