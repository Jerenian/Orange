const Router = require('express')
const flowerController = require('../controllers/flowerController')
const { json } = require('sequelize')
const router = new Router()

router.post('/',  flowerController.create )
router.get('/', flowerController.getAll)
router.delete('/', flowerController.remove)

module.exports = router