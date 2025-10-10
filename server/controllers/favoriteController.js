
const {Favorite, FavoriteProduct, Product} = require('../models/model')
const uuid = require('uuid')
const { create } = require('./userController')
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken')


const add = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const productId = req.body.id
        const id = uuid.v4()
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        let decoded 
        decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        
        const favorite = await Favorite.findOne({userId: decoded.id})
        const favoriteFind = await FavoriteProduct.findOne({
            where: {
                productId: productId
            }
        })
        if(favoriteFind){
            await FavoriteProduct.destroy({
                where: {
                    productId: productId
                },
            });
        }else{
            await FavoriteProduct.create({id, productId, favoriteId: favorite.id})
        }
        const dataFavorite = await FavoriteProduct.findAll()
        res.json(dataFavorite)
        
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        let decoded 
        decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        //(decoded)
        const favoriteId = await Favorite.findOne({userId: decoded.id})
        //(favoriteId.id)
        const productFavorite = await FavoriteProduct.findAll()
        res.json(productFavorite)
        
    } catch (error) {
        next(error)
    }
}
    const getProducts = async(req, res) => {
        try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        let decoded 
        decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        const idList = req.body
        const products = await Product.findAll({where : {
            id : {
                [Op.in] : idList
            }
        }})
        res.json(products)
        //(products)
        } catch (error) {
            
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
module.exports = {create, remove, put, get, add, getProducts}