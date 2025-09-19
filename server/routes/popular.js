const Router = require('router')
const productController = require('../controllers/popularController')

const router = new Router()

router.get('/', productController.getPopular)
router.post('/', productController.addPopular)

module.exports = router