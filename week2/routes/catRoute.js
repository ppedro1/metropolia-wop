'use strict';
const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const Router = require('express').Router()
const catController = require('../controllers/catController')

Router.get('/', catController.getCats)
Router.get('/:id', catController.getCat)
Router.post('/', upload.single('image'), (req, res, next) => {
    req.body.image = req.file
    next()
})
Router.post('/', catController.addCat)

module.exports = Router
