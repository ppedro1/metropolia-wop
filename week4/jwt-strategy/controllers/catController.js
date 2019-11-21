const catModel = require('../models/catModel')

const getCats = async (req, res) => {
    try {
        const cats = await catModel.getAllCats()
        res.status(200).json(cats)
    } catch (e) {
        console.log(e)
        res.status(400).json({
            error: 'somethings happened'
        })
    }
}

const getCat = async (req, res) => {
    try {
        const cat = await catModel.getCatById(req.params.id)
        res.status(200).json(cat)
    } catch (e) {
        console.log(e)
    }
}

const addCat = async (req, res) => {
    var filepath = 'uploads/' + (req.body.image.filename || '') 
    const catObject = {
        name: req.body.name,
        age: req.body.age || 0,
        weight: req.body.weight || 0.0,
        owner: req.body.owner || '',
        filename: filepath
    }

    try {
        await catModel.addCat(catObject)
        res.redirect('/')
    } catch (e) {
        console.log(e)
    }
}

const editCat = async (req, res) => {
    console.log('body', req.body)

    const [cat] = await catModel.getCatById(req.body.id)

    const newCatData = {
        id: req.body.id,
        name: req.body.name || cat.name,
        age: req.body.age || cat.age,
        weight: req.body.weight || cat.weight,
        owner: req.body.owner || cat.owner,
        filename: req.body.filename || cat.filename
    }

    try {
        const [cat] = await catModel.editCat(newCatData)
        res.status(200).json(cat)
    } catch (e) {
        console.log(e)
    }
}

const deleteCat = async (req, res) => {
    try {
        await catModel.deleteCat(req.params.id)
        res.status(200).end()
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getCats,
    getCat,
    addCat,
    editCat,
    deleteCat
}