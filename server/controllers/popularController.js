const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/model')
const { where } = require('sequelize')
const {Popular} = require('../models/model')

    const addPopular = async (req, res) => {
        console.log('add Popular')
        console.log(req.body)
        try{
            let id = uuid.v4()
            const {productId} = req.body
            const product = await Product.findOne({where: {id: productId}})
            console.log(product)
            console.log(productId)
            const item = await Popular.create({id, productId})
            console.log(item)
            res.json(item)
        } catch (error) {
            console.log(error.message)
        }

    }
    const getPopular = async (req, res) => {
        console.log('get POP')
        try {

            const popular = await Popular.findAll()
            
            res.json(popular)
            
        } catch (error) {
            console.log(error.message)
        }
    }
module.exports = {addPopular, getPopular}