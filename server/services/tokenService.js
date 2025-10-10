
const jwt = require('jsonwebtoken')
const {Token} = require('../models/model')
const userController = require('../controllers/userController')
const ApiError = require('../exeptions/apiError')
const generationTokens = async (payload) => {
    console.log(payload)
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS_KEY, {expiresIn: '24h'})
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH_KEY, {expiresIn: '30d'})
    return {
        accessToken,
        refreshToken
    }
}
const validateAccessToken = async (token) => {
    try {
        //(token)
        const userData = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        //(userData)
        return userData
    } catch (error) {
        return null
    }
}
const validateRefreshToken = async (token) => {
    try {
        const userData = jwt.verify(token, process.env.JWT_SECRET_REFRESH_KEY)
        return userData
    } catch (error) {
        return null
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
const removeToken = async(refreshToken) => {
    //(refreshToken)
    const token = await Token.findOne({where: {refreshToken: refreshToken}})

    return await token.destroy()
}
const findToken = async(refreshToken) => {
    const token = await Token.findOne({where: {refreshToken: refreshToken}})

    return token
}

module.exports = {generationTokens, saveToken, removeToken, validateAccessToken, validateRefreshToken, findToken}