const ApiError = require('../exeptions/apiError');
module.exports = function (err, req, res, next) {
    console.log(err)
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    if(err.message.includes('jwt')){
        return res.status(403).json()
    }
    if(err.message.includes('split')){
        return res.json(401)
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'})

};