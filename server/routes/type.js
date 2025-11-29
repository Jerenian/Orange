const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/',typeController.create)
router.get('/', typeController.getAll)
router.delete('/', typeController.remove)
router.put('/', typeController.update)

module.exports = router