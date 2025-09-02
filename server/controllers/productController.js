
const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/model')
const { where } = require('sequelize')


const create = async (req, res) => {
    try {
    
        const {name, price, typeId, description, isPopular, country} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        let id = uuid.v4()
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const item = await Product.create({id, name, price, typeId, description, isPopular, country})
        return res.json(item)
    } catch (error) {
        console.log(error.message)
    }
}
const remove = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}
const put = async (req) => {
    try {
        
    } catch (error) {
        
    }
}
const getAll = async (req, res) => {
    try {
        const {typeId, categoryId} = req.query
        let product
        if(!typeId && !categoryId) {
            product = await Product.findAll()
        }
        if(typeId && !categoryId) {
            product = await Product.findAll({where: {typeId}})
        }
        
        if(!typeId && categoryId) {
            product = await Product.findAll({where: {categoryId}})
        }

        res.json(product)

    } catch (error) {
        
    }
} 
const getOne = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findOne({where: {id}})
        return res.json(product)
    } catch (error) {
        
    }
}
module.exports = create, remove, getAll, getOne