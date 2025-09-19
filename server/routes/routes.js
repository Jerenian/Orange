const Router = require('express')
const router = new Router()
const productRouter = require('./product')
const basketRouter = require('./basket')
const typeRouter = require('./type')
const popularRouter = require('./popular')

router.use('/types', typeRouter)
router.use('/products', productRouter)
router.use('/basket', basketRouter)
router.use('/popular', popularRouter)


module.exports = router