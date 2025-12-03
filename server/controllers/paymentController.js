const  { YooCheckout } = require('@a2seven/yoo-checkout')
const uuid = require('uuid')
const {Purchase, Product} = require('../models/model')
const YouKassa = new YooCheckout({
    shopId: process.env.YOU_KASSA_ID,
    secretKey: process.env.YOU_KASSA_SECRET_KEY
 });


const payment =  async (req, res) => {
    const {price} = req.body
    const indKey = uuid.v4()
    const createPayload = {
        amount: {
          "value": price ,
          "currency": "RUB"
        },
        payment_method_data: {
          "type": "bank_card"
        },
        confirmation: {
          "type": "redirect",
          "return_url": "https://localhost:5173"
        },
        capture: true,
        
    };

    try {
        const payment = await YouKassa.createPayment(createPayload, indKey);
        res.setHeader('Content-Type', 'application/json');
        res.json(payment)
    } catch (error) {
        res.status(400).json(error)
    }
}
const notifications = async( req, res ) => {
    const {id, status, paid} = req.body.object

    try {
        const item = await Purchase.update(
            {
                status,
                paid
            },
            {
                where:{id}
            }
        )
        res.setHeader('Content-Type', 'application/json');
        res.json(item)
    } catch (error) {
    }
}
module.exports = {payment, notifications}