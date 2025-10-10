const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/model')
const { where } = require('sequelize')
const {Popular} = require('../models/model')

    const addPopular = async (req, res) => {
        //('add Popular')
        //(req.body)
        try{
            let id = uuid.v4()
            const {productId} = req.body
            const product = await Product.findOne({where: {id: productId}})
            //(product)
            //(productId)
            const item = await Popular.create({id, productId})
            //(item)
            res.json(item)
        } catch (error) {
            //(error.message)
        }

    }
    const getPopular = async (req, res) => {
        //('get POP')
        try {

            const popular = await Popular.findAll()

            res.json(popular)
            
        } catch (error) {
            //(error.message)
        }
    }
module.exports = {addPopular, getPopular}
// Удалить этот контроллер и роут
// создам новую функцию c с методом PUT в контроллере, которая будет получать id и выставлять в isPopular значение true
// будет выводить все продукты где isPopular будет true
// В таком случае при рендеринге главной страницы я смогу еще и подцепить данные для минимальной и максимвльной цены
