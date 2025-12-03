const {Type, Product} = require('../models/model')
const uuid = require('uuid')
const path = require('path')
const jwt = require('jsonwebtoken')
const { log } = require('console')
const {Op} = require('sequelize')
const fs = require('fs')
const create = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        if (decoded.role !== 'admin') {
            return res.status(403).json({message: "Нет доступа"})
        }
        let id = uuid.v4()
        const {name} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const type = await Type.create({id, name, img: fileName})
        return res.json(type)
    } catch (error) {
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
        const getProducts = await Product.findAll({where: {typeId: id}})
        const productsIdList = getProducts.map(item => item.id)
        const fileList = getProducts.map(img => img.img)

        await Product.destroy({
            where: {
                id: {
                    [Op.in]: productsIdList
                }
            }
        }) 
        const type = await Type.destroy({
            where: {
                id
            },
        });
        fileList.map(item => {
            const rmImg = fs.rm(path.resolve(__dirname, '..', 'static', item), () => {
            })
        })
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

const update = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        if (decoded.role !== 'admin') {
            return res.status(403).json({message: "Нет доступа"})
        }
        const {name, id} = req.body
        let item 
        if(req.files) {
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            item = await Type.update(
                {
                    img: fileName
                },
                {
                    where:{id}
                }
            )
        }
        item = await Type.update(
        {
            name: name
        },
        { 
            where:{id}
        }
    )
        res.json(item)
    } catch (error) {
    }
}
module.exports = {create, remove, getAll, update}