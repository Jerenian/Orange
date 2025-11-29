const Router = require('express')
const productController = require('../controllers/productController')

const router = new Router()

router.get('/', productController.getAll)
router.post('/', productController.create)
router.put('/', productController.update)
router.put('/popular', productController.updatePopular)
router.delete('/', productController.remove)
router.get('/search/:text', productController.search)
router.post('/filter', productController.filter)
router.post('/sort', productController.sort)


module.exports = router