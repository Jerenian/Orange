const Router = require('express')
const router = new Router()
const productRouter = require('./product')
const favoriteRouter = require('./favorite')
const typeRouter = require('./type')
const userRouter = require('./user')
router.use('/types', typeRouter)
router.use('/products', productRouter)
router.use('/favorite', favoriteRouter)
router.use('/user', userRouter)


module.exports = router