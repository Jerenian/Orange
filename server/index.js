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
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(cookieParser())

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

//узнать пароль от яндекса