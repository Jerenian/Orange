
const uuid = require('uuid')
const {User} = require('../models/model')
const { where } = require('sequelize')
const {Token} = require('../models/model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userService = require('../services/userService')

const create = async (req, res)  =>{

    try {
        const {login, password, name, role} = req.body
        
        const userData = await userService.register(login, password, name, role)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})
        return res.json(userData)
    } catch (error) {
        console.log(error)  
    }
}
const login = async (req, res) => {

    try {

        const {login, password} = req.body

        const findLogin = await User.findAll({where: {login}}) 
        if(findLogin?.length){
            
            let hash = crypto.createHmac('sha512', findLogin[0].salt);
            hash.update(password);
            let value = hash.digest('hex');
            if(findLogin[0].hashedpassword === value) {
                
            return res.status(200).json({
            id: findLogin[0].id,
            login: findLogin[0].login,
            role: findLogin[0].role,
            token: jwt.sign({ id: findLogin[0].id }, process.env.SECRET_KEY),
        });
            }else{
                return res.json({message:"NOT OK!"})
            }

        } else {

            return res.json('Пользователь не найден')

        }
        
    } catch (error) {

        console.log(error.message)

    }
}
const logOut = async () => {
    try {
        
    } catch (error) {
        
    }
}
const activate = async (res, req) =>{
    try {
        console.log('a')
        const activationLink = req.params.link
        await userService.activate(activationLink)
        return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
        
    }
}
const refreshToken = async () => {
    try {
        
    } catch (error) {
        
    }
}
const getUsers = async () => {
    try {
        
    } catch (error) {
        
    }
}
    
module.exports = {create, login, getUsers, refreshToken, activate, logOut}