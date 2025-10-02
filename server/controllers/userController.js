
const uuid = require('uuid')
const {User} = require('../models/model')
const { where } = require('sequelize')
const {Token} = require('../models/model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const MailService = require('../services/mailService')
const tokenService = require('../services/tokenService')
const create = async (req, res)  =>{

    try {
            const {login, password, name, role} = req.body
            let salt = crypto.randomBytes(16).toString(`hex`);
            let hash = crypto.createHmac('sha512', salt);
            hash.update(password);
            let value = hash.digest('hex');
            const hashedpassword = value
            let id = uuid.v4()
            const activationLink = uuid.v4()
            await MailService.sendActivationMail(ElementInternals, activationLink)
            const tokens = tokenService.generatonTokens()
            const item = await User.create({id, name, login, salt, hashedpassword, role, activationLink})
            return res.json(item)
        
    } catch (error) {
        res.json({error})  
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
const activate = async () =>{
    try {
        
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