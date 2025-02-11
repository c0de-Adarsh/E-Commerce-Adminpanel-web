const strip = require('stripe')(process.env.STRIPE_SECRET_KEY)
require('dotenv').config()


const processPayment = async (req , res) =>{

    try {
       
        const myPayment  = await strip.paymentIntents.create({
            amount: req.body.amount,
            currency: 'inr',
            metadata:{
                company:'Ecommerce'
            },
        })

        res.status(200).json({
            success:true,
            client_secret: myPayment.client_secret
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

 const sendStripeApiKey = async ( req , res) =>{
    try {
   
        res.status(200).json({stripeApiKey:process.env.STRIPE_PUBLISHABLE_KEY})
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
 }

module.exports = {processPayment , sendStripeApiKey}