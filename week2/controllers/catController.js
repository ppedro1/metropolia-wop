'use strict';
// catController

const catModel = require('../models/catModel')

const addCat = async (req, res) => {
    var filepath = 'uploads/' + (req.body.image.filename || '') 
    const catObject = {
        name: req.body.name,
        age: req.body.age || '0',
        weight: req.body.weight || '0.0',
        owner: req.body.owner || '',
        filename: filepath
    }

    await catModel.addCat(catObject)
   // res.status(200).json(catObject)
   res.redirect('/')
}

const getCats = async (req, res) => {
    const cats = await catModel.getAllCats()
    res.status(200).json(cats)
}

const getCat = async (req, res) => {
   const cat = await catModel.getCatById(req.params.id)
   res.status(200).json(cat)
}

module.exports = {
    addCat,
    getCats,
    getCat
}