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
            subject: 'Активация аккаунта' + to,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации аккаунта на flowers-orange.ru перейдите по ссылке ниже</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }   

module.exports = {sendActivationMail}