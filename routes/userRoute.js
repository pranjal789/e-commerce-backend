import express from "express";
import User from "../models/userModel";

const router=express.Router();
router.get("/createadmin",async(req,res)=>{
    try {
        const user=new User({
            name:"Pranjal",
            email:"pranjal@gmail.com",
            password:"abc",
            isAdmin:true
        });
        const newUser=await user.save();
        res.send(newUser);
    } 
    catch (error) {
      res.send({msg:error.message})  
    }
    
});
router.post("/signin",async(req,res)=>{
    const signin=await User.findOne({
        email:req.body.email,
        password:req.body.password
    });
    if(signin){
        res.send({
            _id:signin.id,
            name:signin.name,
            email:signin.email,
            isAdmin:signin.isAdmin
            //token:getToken(signin)
        })
    }
    else{
        res.status(401).send("Invalid username or Password")
    }
});
router.post("/register",async(req,res)=>{
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    const newReg=await newUser.save();
    console.log(newReg)
    if(newReg){
        res.send({
            _id:newReg.id,
            name:newReg.name,
            email:newReg.email,
            isAdmin:newReg.isAdmin
            //token:getToken(signin)
        })
    }
    else{
        res.status(401).send("Invalid username data")
    }
});

export  default router;