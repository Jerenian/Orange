const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/register', userController.create)
router.post('/login', userController.login)
router.post('/activate/:link', userController.activate)


module.exports = router