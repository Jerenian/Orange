
const {Basket, BasketProduct, Product} = require('../models/model')
const uuid = require('uuid')
const { create } = require('./userController')
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken')


const add = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            const error = {message: 'jwt'}
            next(error)
        }
        const token = req.headers.authorization.split(' ')[1]
        const productId = req.body.id
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        let decoded 
        decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        
        const basket = await Basket.findOne({where:{userId: decoded.id}})

        const id = uuid.v4()
        console.log(req.body)
        if(req.body.palette){
            const palette = req.body.palette
            console.log(palette)
            await BasketProduct.create({id, productId, palette, basketId: basket.id})
        } else {
            console.log('b')
            await BasketProduct.create({id, productId, basketId: basket.id})
        }

        const dataBasket = await BasketProduct.findAll({where: {basketId: basket.id}})
        res.json(dataBasket)
        
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            res.status(401)
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        let decoded 
        decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)

        const basketId = await Basket.findOne({where: {userId: decoded.id}})

        const productBasket = await BasketProduct.findAll(
            {where: {
                basketId: basketId.id
            }
        }
        )
        const idList = productBasket?.map(item => item.productId)
        const products = await Product.findAll({where : {
            id : {
                [Op.in] : idList
            }
        }})
        const idProducts = products?.map(item => item.id)
        const result = await BasketProduct.findAll({where : {
            basketId: basketId.id,
            productId : {
                [Op.in] : idProducts
            }
        }})
        res.json(result)
        
    } catch (error) {
        next()
    }
}
    const getProducts = async(req, res) => {
        try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        let decoded 
        decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        const idList = req.body.credentials

        const products = await Product.findAll({where : {
            id : {
                [Op.in] : idList
            }
        }})
        res.json(products)
        } catch (error) {
            return res.status(401).json({message: "Не авторизован"})
        }
    }
const remove = async (req, res) => {
    try {
        const {credentials} = req.body
        if(!req.headers.authorization){
            res.status(401)
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        let decoded 

        decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)

        const basketId = await Basket.findOne({where: {userId: decoded.id}})

        const basketDel = await BasketProduct.findOne({
            where: {
                [Op.and]: [
                    { basketId: basketId.id  },
                    { productId: credentials }
                ]

            }
        })
        if (basketDel) {
            await basketDel.destroy();
        }
        const basketData = await BasketProduct.findAll({
            where: {
                basketId: basketId.id
            }
        })
        let result = basketData?.map(item => item?.productId)
        res.json(basketData)
    } catch (error) {
        console.log(error.message)
    }
}
const clear = async(req, res) => {
    try{
        if(!req.headers.authorization){
            res.status(401)
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        let decoded 

        decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)

        const basketId = await Basket.findOne({where: {userId: decoded.id}})

        const result = await BasketProduct.destroy({
            where: {
                basketId: basketId.id
            }
        }) 
        res.json('success')
    }
    catch(error) {
        console.log(error.message)
    }
}
module.exports = {create,  get, add, getProducts, remove, clear}