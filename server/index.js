const express = require('express')
require('dotenv').config()
const cors = require('cors')
const PORT= process.env.PORT || 5001
const app = express()
const sequelize = require('./db')
const router = require('./routes/routes')
const fileUpload = require('express-fileupload')
const path = require('path')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/errorMiddleware')




app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware);


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(process.env.PORT, () => ('Server started on port ' + PORT))
    } catch (error) {
        res.json(error.message)
    }
}



start()
