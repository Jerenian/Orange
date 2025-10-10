const Router = require('express')
const favoriteController = require('../controllers/favoriteController')
const router = new Router()

router.post('/', favoriteController.add) 
router.get('/', favoriteController.get)
router.post('/products', favoriteController.getProducts)
// router.delete('/', )


module.exports = router