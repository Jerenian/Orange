
const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/model')
const { where } = require('sequelize')




    const remove = async  (req, res) =>{
        console.log('aaa')
        try {
            
        } catch (error) {
            
        }
    }
    const create = async (req, res)  =>{
        console.log('create')
        try {
        
            const {name, price, typeId, description, isPopular, country, length} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            let id = uuid.v4()
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Product.create({id, name, price, typeId, description, isPopular, country, length})
            return res.json(item)
        } catch (error) {
            console.log(error.message)
        }
    }
    const put = async (req)  =>{
        try {
            
        } catch (error) {
            
        }
    }
    const getAll = async (req, res)=>{
        console.log('sdfasdfa')
        try {
            console.log('a_________-111')
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
    const getOne = async (req, res) =>{
        try {
            const {id} = req.params
            const product = await Product.findOne({where: {id}})
            return res.json(product)
        } catch (error) {
            
        }
    }

module.exports = {getAll, getOne, create, remove}