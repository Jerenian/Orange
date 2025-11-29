const Router = require('express')
const orderController = require('../controllers/orderController')
const router = new Router()

router.post('/', orderController.add) 
router.get('/', orderController.getAll)
router.put('/', orderController.put)
router.delete('/', orderController.remove)


module.exports = router