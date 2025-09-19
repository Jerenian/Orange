
const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/model')
const { where } = require('sequelize')
const {Popular} = require('../models/model')



    const remove = async  (req, res) =>{

        try {
            
        } catch (error) {
            
        }
    }
    const create = async (req, res)  =>{

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
        console.log("GetAll")
        try {
            const {typeId, categoryId} = req.query
            console.log(req.query)
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
        console.log("GetOne")
        try {
            const {id} = req.params
            const product = await Product.findOne({where: {id}})
            return res.json(product)
        } catch (error) {
            
        }
    }
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
module.exports = {getAll, getOne, create, remove, getPopular, addPopular}