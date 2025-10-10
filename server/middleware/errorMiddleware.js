const ApiError = require('../exeptions/apiError');
module.exports = function (err, req, res, next) {
    //(err.message)
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    if(err.message.includes('jwt')){
        return res.status(403).json()
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'})

};