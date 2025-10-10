const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {body} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/register',
    // body('login').isEmail(),
    // body('password').isLength({min: 3, max: 32}),
    userController.create)
router.post('/login', userController.login)
router.get('/activate/:link', userController.activate)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/check', userController.checkUser)
router.get('/', authMiddleware, userController.getUsers)


module.exports = router