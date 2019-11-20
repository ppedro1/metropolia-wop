const multer = require('multer')
const upload = multer({
    dest: 'public/uploads/'
})
const Router = require('express').Router()
const catController = require('../controllers/catController')
const { check, validationResult } = require('express-validator')

const ADD_CAT_VALIDATOR = [
    check('name')
        .not().isEmpty()
        .trim()
        .escape(),
    check('age').isNumeric(),
    check('weight').isNumeric(),
    check('owner')
        .not().isEmpty(),
    check('image')
        .not().isEmpty()
]

const MODIFY_CAT_VALIDATOR = [
    check('name')
        .not().isEmpty()
        .trim()
        .escape(),
    check('age').isNumeric(),
    check('weight').isNumeric(),
    check('owner')
        .not().isEmpty()
]

Router.get('/', catController.getCats)
Router.get('/:id', catController.getCat)
Router.post('/', upload.single('image'), (req, res, next) => {
    req.body.image = req.file
    next()
})
Router.post('/', ADD_CAT_VALIDATOR, catController.addCat)
Router.put('/', MODIFY_CAT_VALIDATOR, catController.editCat)
Router.delete('/:id', catController.deleteCat)

module.exports = Router