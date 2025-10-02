const {User} = require('../models/model')
const bcrypt = require('bcrypt')
const MailService = require('../services/mailService')
const tokenService = require('../services/tokenService')
const UserDto = require('../dto/userDto')
const uuid = require('uuid')
const register = async (login, password, name, role) => {
    try{
        const condidate = await User.findOne({where: {login}})
        if(condidate){
            throw new Error(`Пользователь с email ${login} уже зарегистрирован`)
        }
        const hashedpassword = await bcrypt.hash(password, 4)
        const activationLink = uuid.v4()
        const id = uuid.v4()
        await MailService.sendActivationMail(login, `${process.env.API_URL}/api/activate/${activationLink}`)
        const user = await User.create({id, login, password:hashedpassword, name, role, activationLink})
        const userDto = new UserDto(user)
        const tokens = await tokenService.generatonTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }
    catch(e) {
        console.log(e)
    }
    
} 
const activate = async (activationLink) => {
    const user = await User.findOne({activationLink})
    if(!user) {
        throw new Error('Некорректная ссылка активации')
    }
    user.isAcitvated = true
    await user.save();
}
 



module.exports = {register, activate}