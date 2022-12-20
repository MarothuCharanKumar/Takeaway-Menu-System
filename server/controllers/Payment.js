require('dotenv').config();
const db = require('../database/database');
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const payment=async (payload)=>{
    try {
        let {amount,id}=payload;
        let success =  await stripe.paymentIntents.create({
                                                                amount,
                                                                currency: "GBP",
                                                                description: "Chrunchy Spicy Resturent",
                                                                payment_method: id,
                                                                confirm: true
                                                            })
       
    return success;
    } catch (error) {
        console.log(error)
        return error;
    }
    
}
const process_payment= {payment}
module.exports = process_payment