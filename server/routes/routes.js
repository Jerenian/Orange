const Router = require('express')
const router = new Router()
const productRouter = require('./product')
const favoriteRouter = require('./favorite')
const typeRouter = require('./type')
const userRouter = require('./user')
const flowerRouter = require('./flower')
const basketRouter = require('./basket')
const orderRouter = require('./order')
router.use('/types', typeRouter)
router.use('/products', productRouter)
router.use('/favorite', favoriteRouter)
router.use('/user', userRouter)
router.use('/flowers', flowerRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)


module.exports = router