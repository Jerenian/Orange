const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.STRING, primaryKey: true},
    login: {type: DataTypes.TEXT, unique: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'user' },
    password: {type: DataTypes.STRING, allowNull: false},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING}
})


const Favorite = sequelize.define('favorite', {
    id: {type: DataTypes.STRING, primaryKey: true,}, 
})
const FavoriteProduct = sequelize.define('favorite_product', {
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
const Token = sequelize.define('token',{
    refreshToken: {type: DataTypes.TEXT}
})

User.hasOne(Favorite)
Favorite.belongsTo(User)

Favorite.hasMany(FavoriteProduct)
FavoriteProduct.belongsTo(Favorite)



Product.hasMany(FavoriteProduct)
FavoriteProduct.belongsTo(Product)



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
    Token
}

sequelize.sync()