const ApiError = require('../exeptions/apiError');
//const tokenService = require('../services/tokenService')
module.exports = async function (req, res, next) {
    console.log(req.headers)
    // try {
    //     const authHeader = req.headers.authorization
    //     if(!authHeader){
    //         return next(ApiError.UnauthorizedError())
    //     }
    //     const accessToken = authHeader.split(' ')[1]
        
    //     if(!accessToken) {
    //         return next(ApiError.UnauthorizedError())
    //     }

    //     const userData = await tokenService.validateAccessToken(accessToken)
    //     if(!userData) {
    //         return next(ApiError.UnauthorizedError())
    //     }

    //     req.user = userData
    //     next()

    // } catch (error) {
    //     return next(ApiError.UnauthorizedError())
    // }
  

};