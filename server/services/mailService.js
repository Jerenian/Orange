const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '465',
        secure: true,
        auth: {
            user: 'aleksandorkaz@gmail.com',
            pass: 'lvldormsyjnurbqn'
        },
})

const sendActivationMail = async (to, link) => {
        console.log(to)
        await transporter.sendMail({
            from: 'aleksandorkaz@gmail.com',
            to,
            subject: 'Активация аккаунта на ' + 'http://localhost:5001',
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }   

module.exports = {sendActivationMail}