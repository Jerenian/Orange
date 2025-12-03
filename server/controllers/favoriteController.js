
const {Favorite, FavoriteProduct, Product} = require('../models/model')
const uuid = require('uuid')
const { create } = require('./userController')
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken')


const add = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            res.status(401)
        }
        const token = req.headers.authorization.split(' ')[1]
        const productId = req.body.id
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        let decoded 
        decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        
        const favorite = await Favorite.findOne({where:{userId: decoded.id}})

        const id = uuid.v4()
        const favoriteFind = await FavoriteProduct.findAll({
            where: {
                favoriteId: favorite.id,
            }
        })
        let willDelete = false
        favoriteFind.forEach( async (item) => {
            if(item.productId === productId) {
                willDelete = true
            } 
        })
        if(!willDelete){
            await FavoriteProduct.create({id, productId, favoriteId: favorite.id})
        } else{
            await FavoriteProduct.destroy({
                where : {
                    productId: productId,
                    favoriteId: favorite.id,
                }
            })
        }
        const dataFavorite = await FavoriteProduct.findAll({where: {favoriteId: favorite.id}})
        res.json(dataFavorite)
        
    } catch (error) {
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

        const favoriteId = await Favorite.findOne({where: {userId: decoded.id}})

        const productFavorite = await FavoriteProduct.findAll(
            {where: {
                favoriteId: favoriteId.id
            }
        }
        )
        const idList = productFavorite?.map(item => item.productId)
        const products = await Product.findAll({where : {
            id : {
                [Op.in] : idList
            }
        }})
        const idProducts = products?.map(item => item.id)
        const result = await FavoriteProduct.findAll({where : {
            favoriteId: favoriteId.id,
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
        
    } catch (error) {
        
    }
}
const put = async (req) => {
    try {
        
    } catch (error) {
        
    }
}
module.exports = {create,  get, add, getProducts}