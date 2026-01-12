const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '465',
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        },
})

const sendActivationMail = async (to, link) => {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + 'http://localhost:5001',
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации аккаунта на orange-flowers.ru перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }   

module.exports = {sendActivationMail}