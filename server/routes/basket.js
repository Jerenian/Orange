const Router = require('express')
const basketController = require('../controllers/basketController')
const router = new Router()
const PaymentController = require('../controllers/paymentController')
router.post('/payment',PaymentController.payment)
router.post('/payment/notifications' , PaymentController.notifications)
router.post('/', basketController.add) 
router.get('/', basketController.get)
router.post('/products', basketController.getProducts)
router.delete('/', basketController.remove)
router.delete('/clear', basketController.clear)

module.exports = router