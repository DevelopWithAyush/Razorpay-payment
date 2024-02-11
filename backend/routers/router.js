import  express from "express"
import {instance} from "../index.js"
import crypto from "crypto";
const router = express.Router()


router.get("/key",async(req,res)=>{
    res.status(200).json({key:process.env.RAZORPAY_API_KEY})
})

  router.post("/checkout",async(req,res)=>{

    const {amount} = req.body
    var options = {
        amount: amount,  // amount in the smallest currency unit
        currency: "INR",
      };
    const order = await instance.orders.create(options)
    res.status(200).json({success:true ,order})
  });

  router.post("/paymentverification",async(req,res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
    

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    // await Payment.create({
    //   razorpay_order_id,
    //   razorpay_payment_id,
    //   razorpay_signature,
    // });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
  })





export default router;