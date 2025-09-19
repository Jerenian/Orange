const Router = require('express')
const productController = require('../controllers/productController')


const router = new Router()

router.get('/', productController.getAll)
router.post('/', productController.create)
router.get('/:id', productController.getOne)
router.get('/popular', productController.getPopular)
router.post('/popular', productController.addPopular)
router.delete('/', productController.remove)


module.exports = router