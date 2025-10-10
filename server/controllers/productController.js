
const uuid = require('uuid')
const path = require('path')
const {Product} = require('../models/model')
const { where } = require('sequelize')
const {Popular} = require('../models/model')
const jwt = require('jsonwebtoken')


    const remove = async  (req, res) =>{

        try {
            
        } catch (error) {
            
        }
    }
    const create = async (req, res)  =>{

        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
               return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
            if (decoded.role !== 'admin') {
                return res.status(403).json({message: "Нет доступа"})
            }
            const {name, price, typeId, description, isPopular, country, length} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            let id = uuid.v4()
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Product.create({id, name, price, typeId, description, isPopular, country, length})
            return res.json(item)
            
        } catch (error) {
            //(error.message)  
        }
    }
    const put = async (req)  =>{
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            //const decoded = tokenService.validateAccessToken(token, process.env.SECRET_KEY)
            //(process.env.JWT_SECRET_ACCESS_KEY)
            const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
            //(decoded)
            if (decoded.role !== 'admin') {
                return res.status(403).json({message: "Нет доступа"})
            }
            
        } catch (error) {
            
        }
    }
    const getAll = async (req, res)=>{
        //("GetAll")
        try {
            const {typeId, categoryId} = req.query
            //(req.query)
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
        //("GetOne")
        try {
            const {id} = req.params
            const product = await Product.findOne({where: {id}})
            return res.json(product)
        } catch (error) {
            
        }
    }

    const addPopular = async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        //const decoded = tokenService.validateAccessToken(token, process.env.SECRET_KEY)
        //(process.env.JWT_SECRET_ACCESS_KEY)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        //(decoded)
        if (decoded.role !== 'admin') {
            return res.status(403).json({message: "Нет доступа"})
        }
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
    
module.exports = {getAll, getOne, create, remove, addPopular}