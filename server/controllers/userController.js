
const uuid = require('uuid')
const {User} = require('../models/model')
const { where } = require('sequelize')
const {Token} = require('../models/model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userService = require('../services/userService')
const { validationResult } = require('express-validator')
const ApiError = require('../exeptions/apiError')
const create = async (req, res, next)  =>{

    try {
        const {login, password, name, role} = req.body
        const userData = await userService.register(login, password, name, role)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
        return res.json(userData)
    } catch (error) {
        next(error)
    }
}
const login = async (req, res, next) => {   
   try {
        const {login, password} = req.body
        const userData = await userService.login(login, password)
        await res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
        return res.json(userData)
    } catch (error) {
        next(error)
    }
}
const logout = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        const token = await userService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token);
    } catch (e) {
        next(e);
    }
}
const activate = async (req, res) =>{
    try {
        const activationLink = req.params.link
        await userService.activate(activationLink)
        return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
        next(error)
    }
}
const refresh = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies
        const userData = await userService.refresh(refreshToken)
        await res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
        return res.json(userData)
    } catch (error) {
        next(error)
    }
}
const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers()
        return res.json(users)
    } catch (error) {
        next(error)
    }
}
const checkUser = async(req, res) => {
        if(!req.headers.authorization){
            res.status(401)
        }
        const token = req.headers.authorization.split(' ')[1]
        let decoded
        if(token){
            decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY)
        } else{
            res.status(401)
        }
        if(decoded) {
            const user = await User.findOne({where :{id: decoded.id}})
            return res.json(user)
        }

}
    
module.exports = {create, login, getUsers, refresh, activate, logout, getUsers, checkUser}