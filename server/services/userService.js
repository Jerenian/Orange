const {User, Favorite} = require('../models/model')
const bcrypt = require('bcrypt')
const MailService = require('../services/mailService')
const tokenService = require('../services/tokenService')
const UserDto = require('../dto/userDto')
const uuid = require('uuid')
const jwt  = require('jsonwebtoken')
const ApiError = require('../exeptions/apiError')
const register = async (login, password, name, role) => {
    const condidate = await User.findOne({where: {login}})
    if(condidate){
        throw ApiError.BadRequest(`Пользователь с email ${login} уже зарегистрирован`)
    }
    const hashedpassword = await bcrypt.hash(password, 4)
    const activationLink = uuid.v4()
    const id = uuid.v4()
    //await MailService.sendActivationMail(login, `${process.env.API_URL}/api/user/activate/${activationLink}`)
    const user = await User.create({id, login, password:hashedpassword, name, role, activationLink})
    const userDto = new UserDto(user)
    const tokens = await tokenService.generationTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    //(user.id)
    const favoriteID = uuid.v4()
    const favorite = await Favorite.create({id: favoriteID, userId: user.id})
    return {
        ...tokens,
        user: userDto,
        favorite
    }    
} 

const activate = async (activationLink) => {
    const user = await User.findOne({where: {activationLink}})
    if(!user) {
        throw ApiError.BadRequest('Некорректная ссылка активации')
    }
    user.isActivated = true
    await user.save();
}
const login = async(login, password) => {

    const user = await User.findOne({where: {login}})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = await tokenService.generationTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    
}
const logout = async (refreshToken) => {
    //(refreshToken)
    const token = await tokenService.removeToken(refreshToken);
    return token;
}
const refresh = async(refreshToken) => {
    if(!refreshToken) {
        throw ApiError.UnauthorizedError()
    }
    const userData = await tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = tokenService.findToken(refreshToken)
    //(userData)
    if(!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError()
    }

        const user = await User.findOne({where: {id : userData.id}});
        const userDto = new UserDto(user);
        const tokens = tokenService.generationTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}

}

getAllUsers = async() => {
    const users = await User.findAll()
    return users
}

module.exports = {register, activate, login, logout, getAllUsers, refresh}