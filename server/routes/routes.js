const Router = require('express')
const router = new Router()
const productRouter = require('./product')
const basketRouter = require('./basket')
const typeRouter = require('./type')
const userRouter = require('./user')
router.use('/types', typeRouter)
router.use('/products', productRouter)
router.use('/basket', basketRouter)
router.use('/user', userRouter)


module.exports = router