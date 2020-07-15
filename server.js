import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import bodyParser from "body-parser";


dotenv.config();

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/e-commerce',{
    useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true
}).catch(error=>console.log(error.reason));


const app=express();
const PORT=process.env.PORT ||3001;
app.use(bodyParser.json());

app.use("/api/users",userRoute);
app.use("/api/products",productRoute);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('frontend/build'));
}

app.listen(PORT,function(){
    console.log("listening to port 5000");
})