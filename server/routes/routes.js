const Router = require('express')
const router = new Router()
const itemRouter = require('./item')
const basketRouter = require('./basket')
const typeRouter = require('./type')

router.use('/type', typeRouter)
router.use('/item', itemRouter)
router.use('/basket', basketRouter)


module.exports = router