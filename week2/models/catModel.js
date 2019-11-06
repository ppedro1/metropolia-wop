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
        const [request] = await dbPromise.query('SELECT * FROM wop_cat')
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


module.exports = {
    addCat,
    getAllCats,
    getCatById
}
