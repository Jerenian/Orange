const {Type} = require('../models/model')
const uuid = require('uuid')

const create = async (req, res) => {
    try {
        let id = uuid.v4()
        const {name} = req.body
        const type = await Type.create({id, name})
        return res.json(type)
    } catch (error) {
        
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
module.exports = create, remove,  get