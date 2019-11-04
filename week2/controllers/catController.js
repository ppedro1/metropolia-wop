'use strict';
// catController

const catModel = require('../models/catModel')
const cats = catModel.cats

const getCats = (req, res) => {
    res.send(cats)
}

const getCat = (req, res) => {
    const catById = cats.find(a => a.id === req.params.id)
    if (typeof catById !== 'undefined') {
        res.send(catById)
    } else {
        res.status(404).json({
            'error': `cat with id ${ req.params.id } not found`
        })
    }
}

module.exports = {
    getCats,
    getCat
}