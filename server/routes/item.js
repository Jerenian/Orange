const Router = require('express')
const router = new Router()
const post = require('../controllers/itemController')
const get = require('../controllers/itemController')
const remove = require('../controllers/itemController')
const put = require('../controllers/itemController')
router.post('/', post)
router.get('/', get)
router.delete('/', remove)
router.put('/', put)


module.exports = router