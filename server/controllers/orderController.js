
const {Purchase, Product} = require('../models/model')
const uuid = require('uuid')
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken')


const add = async (req, res, next) => {
    const request = req.body[0]
    console.log("request")
    console.log(request)
    try {
        const item = await Purchase.create(request)
        const data = await Purchase.findAll()
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

const getAll = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        let decoded 
        decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        if(decoded.role !== 'admin') {
            next()
        }
        const items = await Purchase.findAll()
        res.json(items)
    } catch (error) {
        console.log(error.message)
    }
}

const put = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        let decoded 
        decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        if(decoded.role !== 'admin') {
            next()
        }
        const {id} = req.body
                const item = await Purchase.update(
            {
                isHanded: true
            },
            {
                where:{id}
            }
        )
        res.json(item)
    } catch (error) {
        res.status(400).json({message: "Произошла ошибка при изменении статуса вручения"})
    }
}
const remove = async (req, res) => {
    console.log(req.body)
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        let decoded 
        decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        if(decoded.role !== 'admin') {
            next()
        }
        const item = await Purchase.destroy({where: {
            id: req.body.id
        }})
        res.json(id)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message: "Произошла ошибка при удалении информации о заказе"})
    }
}
module.exports = {getAll, add, put, remove}