const express = require('express')
require('dotenv').config()
const models = require('./models/model')
const cors = require('cors')
const PORT= process.env.PORT || 5001
const app = express()
const sequelize = require('./db')
const router = require('./routes/routes')
const fileUpload = require('express-fileupload')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use((req, res, next) => {
    if (req.headers.authorization) {
        
        let tokenParts = req.headers.authorization
            .split(' ')[1]
            .split('.');
        let signature = crypto
            .createHmac('SHA256', tokenKey)
            .update(`${tokenParts[0]}.${tokenParts[1]}`)
            .digest('base64');

        if (signature === tokenParts[2])
            req.user = JSON.parse(
                Buffer.from(
                    tokenParts[1],
                    'base64'
                ).toString('utf8')
            );

        next();
    }

    next();
});
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen('5001', () => console.log('Server started on port ' + PORT))
    } catch (error) {
        console.log(error.message)
    }
}
start()

