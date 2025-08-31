const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const basket = sequelize.define('basket', {
    id: {type: DataTypes.STRING, primaryKey: true,}, 
})
const item = sequelize.define('item', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING,},
    img: {type:DataTypes.STRING },
})
const type = sequelize.define('type', {
    id: {type: DataTypes.STRING, primaryKey: true,},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

type.hasMany(item)
item.belongsTo(type)

basket.hasMany(item)
item.belongsTo(basket)

module.exports = {
    basket,
    item,
    type
}