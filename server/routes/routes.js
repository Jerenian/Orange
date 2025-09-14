const Router = require('express')
const router = new Router()
const productRouter = require('./product')
const basketRouter = require('./basket')
const typeRouter = require('./type')

router.use('/types', typeRouter)
router.use('/products', productRouter)
router.use('/basket', basketRouter)


module.exports = router