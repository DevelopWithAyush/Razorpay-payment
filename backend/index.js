import express, { json } from "express";
import { config } from "dotenv";
import Razorpay from "razorpay";
import router from "./routers/router.js";
import cors from "cors"

config({path:"./config/config.env"}); // dotenv.config() without passing any object

const app = express();
const port = process.env.PORT || 3000; // set a default port if PORT is not provided in the .env file

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api", router); // use the router middleware

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
