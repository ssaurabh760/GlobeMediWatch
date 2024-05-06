import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';

dotenv.config();

//stripe instance
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

//payment router to process the donation payment
const paymentRouter = express.Router();
if(!!stripeInstance){
    paymentRouter.route("/payment/create-checkout-session").post(async(req,res) => {
    const {products} = req.body;
//line items
    const lineItems = products.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.name,
            },
            unit_amount:product.price * 100,
        },
        quantity:1,
    }));

    const session = await stripeInstance.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:`http://localhost:5173/fundraiser/success`,
        cancel_url:"http://localhost:5173/fundraisers",
    });

    res.json({id:session.id, amountAchieved: products.price})
 
});}

export default paymentRouter;