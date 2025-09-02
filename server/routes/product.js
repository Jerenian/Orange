const Router = require('express')
const router = new Router()
const post = require('../controllers/productController')
const getAll = require('../controllers/productController')
const getOne = require('../controllers/productController')
const remove = require('../controllers/productController')
const put = require('../controllers/productController')
router.post('/', post)
router.get('/', getAll)
router.get('/:id', getOne)
router.delete('/', remove)
router.put('/', put)


module.exports = router