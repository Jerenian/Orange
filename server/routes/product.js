const Router = require('express')
const productController = require('../controllers/productController')


const router = new Router()

router.get('/', productController.getAll)
router.post('/', productController.create)
router.get('/:id', productController.getOne)
router.delete('/', productController.remove)


module.exports = router