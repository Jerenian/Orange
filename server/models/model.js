const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.STRING, primaryKey: true,}, 
})
const Product = sequelize.define('product', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING,},
    country: {type: DataTypes.STRING},
    length: {type: DataTypes.STRING},
    img: {type:DataTypes.STRING },
    isPopular: {type: DataTypes.BOOLEAN , defaultValue: false},

})
const Type = sequelize.define('type', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})
const Category = sequelize.define('category', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING,},
    img: {type:DataTypes.STRING }, 
})

Type.hasMany(Product)
Product.belongsTo(Type)
Product.hasMany(Basket)
Category.hasMany(Product)
Product.hasMany(Category)


module.exports = {
    Basket,
    Product,
    Type,
    Category
}