const {FlowerData} = require('../models/model')
const uuid = require('uuid')
const path = require('path')
const jwt = require('jsonwebtoken')
const { log } = require('console')
const {Op} = require('sequelize')
const create = async (req, res) => {
    try {
        // const token = req.headers.authorization.split(' ')[1]
        // if (!token) {
        //     return res.status(401).json({message: "Не авторизован"})
        // }
        // const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        // if (decoded.role !== 'admin') {
        //     return res.status(403).json({message: "Нет доступа"})
        // }
        let id = uuid.v4()
        const {name} = req.body
        const type = await FlowerData.create({id, name,})
        return res.json(type)
    } catch (error) {
        console.log(error.message)
    }
}

const remove = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        if (decoded.role !== 'admin') {
            return res.status(403).json({message: "Нет доступа"})
        }
        const {id} = req.body
        const result = await FlowerData.destroy({
            where: {
                id
            }
        })
        res.json(result)
    } catch (error) {
        console.log(error.message)
    }
}
const getAll = async (req, res) => {
    try {
        const data = await FlowerData.findAll()
        return res.json(data)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {create, remove, getAll}