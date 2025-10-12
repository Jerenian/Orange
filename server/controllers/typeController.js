const {Type} = require('../models/model')
const uuid = require('uuid')
const path = require('path')
const jwt = require('jsonwebtoken')
//const tokenService = require('../services/tokenService')
const create = async (req, res) => {
    console.log(req.files)

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
       // console.log(req.body)
        let id = uuid.v4()
        const {name} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const type = await Type.create({id, name, img})
        return res.json(type)
    } catch (error) {
        (error.message)
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
        const type = await Type.delete({id})
        res.json(type)
    } catch (error) {
        
    }
}
const getAll = async (req, res) => {
    try {
        const types = await Type.findAll()
        return res.json(types)
    } catch (error) {
        
    }
}
module.exports = {create, remove, getAll}