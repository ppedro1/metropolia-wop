'use strict';

const Router = require('express').Router()
const catController = require('../controllers/catController')

Router.get('/', catController.getCats)
Router.get('/:id', catController.getCat)


Router.post('/', (req, res) => {

})

Router.put('/:id', (req, res) => {

})

Router.delete('/:id', (req, res) => {

})

module.exports = Router
