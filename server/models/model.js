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
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type:DataTypes.STRING },
})
const Category = sequelize.define('category', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING,},
    img: {type:DataTypes.STRING }, 
})
const Popular = sequelize.define('popular', {
    id: {type: DataTypes.STRING, primaryKey: true,}, 
})

Type.hasMany(Product)
Product.belongsTo(Type)
Product.hasMany(Basket)
Product.hasMany(Popular)

Category.hasMany(Product)
Product.hasMany(Category)

const Main = sequelize.define('main', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING, unique: true},
        img: {type:DataTypes.STRING }, 
        text: {type:DataTypes.STRING}
})
const About = sequelize.define('about', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING, unique: true},
        img: {type:DataTypes.STRING }, 
        text: {type:DataTypes.STRING}
})
const Payment = sequelize.define('payment', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING, unique: true},
        img: {type:DataTypes.STRING }, 
        text: {type:DataTypes.STRING}
})
const Delivery = sequelize.define('delivery', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING, unique: true},
        img: {type:DataTypes.STRING }, 
        text: {type:DataTypes.STRING}
})
const Contacts = sequelize.define('contact', {
        id: {type: DataTypes.STRING, primaryKey: true},
        name: {type: DataTypes.STRING, unique: true},
        img: {type:DataTypes.STRING }, 
        text: {type:DataTypes.STRING}
})

module.exports = {
    Basket,
    Product,
    Type,
    Category,
    Main,
    About,
    Payment,
    Delivery,
    Contacts, 
    Popular
}

//sequelize.sync()