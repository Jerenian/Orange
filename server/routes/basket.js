const Router = require('express')
const router = new Router()

router.post('/', (res, req) => {
    req.json({message: 'all'})
})
router.get('/', (res, req) => {
    req.json({message: 'all'})
})
router.delete('/', (res, req) => {
    req.json({message: 'all'})
})


module.exports = router