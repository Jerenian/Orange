
const jwt = require('jsonwebtoken')
const {Token} = require('../models/model')
const userController = require('../controllers/userController')
const generatonTokens = async (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS_KEY, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH_KEY, {expiresIn: '30d'})
    return {
        accessToken,
        refreshToken
    }
}
const saveToken = async (id, refreshToken) => {
    const token = await Token.findOne({where: {userId: id}})
    if(token) {
        token.refreshToken = refreshToken
        return token.save()
    }
    const newToken = await Token.create({userId: id, refreshToken})
    return newToken
}

module.exports = {generatonTokens, saveToken}