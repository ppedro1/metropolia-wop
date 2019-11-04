const Router = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const uploadController = require('../controllers/uploadController')

Router.post('/', upload.array('array-upload'), uploadController.uploadArray)


module.exports = Router