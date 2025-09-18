const {Type} = require('../models/model')
const uuid = require('uuid')
const path = require('path')
const create = async (req, res) => {
    try {
        console.log(req.files);
        let id = uuid.v4()
        const {name} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const type = await Type.create({id, name})
        return res.json(type)
    } catch (error) {
        console.log(error.message)
    }
}

const remove = async (req, res) => {
    try {
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