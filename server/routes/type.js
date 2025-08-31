const Router = require('express')
const router = new Router()

router.get('/', (req, res) => {
    res.json({message: 'all'})
})



module.exports = router