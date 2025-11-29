const sequelize = require('../db')
const {DataTypes, STRING} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.STRING, primaryKey: true},
    login: {type: DataTypes.TEXT, unique: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'user' },
    password: {type: DataTypes.STRING, allowNull: false},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING}
})

const Purchase = sequelize.define('purchase', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    delivery: {type: DataTypes.BOOLEAN},
    address: {type: DataTypes.STRING},
    shop: {type: DataTypes.STRING},
    isHanded: {type: DataTypes.BOOLEAN, defaultValue: false},
    status: {type: DataTypes.STRING},
    paid: {type: DataTypes.BOOLEAN, defaultValue: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    products:{type: DataTypes.JSON, allowNull: false},
    comment: {type: DataTypes.STRING},
    selectPalette: {type: DataTypes.STRING}
})



const Favorite = sequelize.define('favorite', {
    id: {type: DataTypes.STRING, primaryKey: true,}, 
})
const FavoriteProduct = sequelize.define('favorite_product', {
    id: {type: DataTypes.STRING, primaryKey: true,}, 
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.STRING, primaryKey: true,}, 
})

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.STRING, primaryKey: true,}, 
    palette: {type: DataTypes.STRING}
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING,},
    img: {type:DataTypes.STRING },
    isPopular: {type: DataTypes.BOOLEAN , defaultValue: false},
    palette: {type: DataTypes.JSON, defaultValue:''}
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type:DataTypes.STRING },
})

const Popular = sequelize.define('popular', {
    id: {type: DataTypes.STRING, primaryKey: true,}, 
})
const Token = sequelize.define('token',{
    refreshToken: {type: DataTypes.TEXT}
})
const FlowerData = sequelize.define('flowerdata', {
    id: {type: DataTypes.STRING, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})


User.hasOne(Favorite)
Favorite.belongsTo(User)

User.hasOne(Basket)
Basket.belongsTo(User)

Favorite.hasMany(FavoriteProduct)
FavoriteProduct.belongsTo(Favorite)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Product.hasMany(FavoriteProduct)
FavoriteProduct.belongsTo(Product)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Type.hasMany(Product)
Product.belongsTo(Type)


Product.hasMany(Popular)
Token.belongsTo(User)

module.exports = {
    Product,
    Favorite,
    FavoriteProduct,
    Type,
    User,
    Token,
    FlowerData,
    Basket,
    BasketProduct,
    Purchase,
}

sequelize.sync({alter: true})
