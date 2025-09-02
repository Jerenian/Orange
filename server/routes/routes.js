const Router = require('express')
const router = new Router()
const productRouter = require('./product')
const basketRouter = require('./basket')
const typeRouter = require('./type')

router.use('/type', typeRouter)
router.use('/product', productRouter)
router.use('/basket', basketRouter)


module.exports = router