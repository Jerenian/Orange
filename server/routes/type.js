const Router = require('express')
const router = new Router()
const post = require('../controllers/typeController')
const get = require('../controllers/typeController')


router.get('/', get)
router.post('/',post)


module.exports = router