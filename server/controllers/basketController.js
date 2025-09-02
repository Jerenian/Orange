
const {Basket} = require('../models/model')
const uuid = require('uuid')
const add = async (req, res) => {
    try {
        
        let id = uuid.v4()
        const product__id = req.id
        const basket = Basket.create()

    } catch (error) {
        
    }
}
const remove = async (id) => {
    try {
        
    } catch (error) {
        
    }
}
const put = async (req) => {
    try {
        
    } catch (error) {
        
    }
}
const get = async(req, res) => {
    try {
        
        res.json({message: "get Basket"})

    } catch (error) {
        
    }
}
module.exports = create, remove, put, get