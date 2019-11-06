'use strict';

const Router = require('express').Router()
const catController = require('../controllers/catController')

Router.get('/', catController.getCats)
Router.get('/:id', catController.getCat)
Router.post('/', catController.addCat)

module.exports = Router
