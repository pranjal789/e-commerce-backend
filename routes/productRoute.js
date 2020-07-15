import express from "express";
import Product from "../models/productModel"
const router=express.Router();

router.get("/",async(req,res)=>{
    const products=await Product.find({});
    res.send(products);
})
router.get("/:id",async(req,res)=>{
    const products=await Product.findById(req.params.id);
    if(products){
        res.send(products);
    }
    else{
        res.status(404).send("Error fecthing product details")
    }
})

router.post("/",async(req,res)=>{
    const product=new Product({
    category: req.body.category,
    productImage:req.body.productImage,
    productName:req.body.productName,
    productBrand:req.body.productBrand,
    productPrice:req.body.productPrice,
    productRating:req.body.productRating,
    detail:req.body.detail,
    quantityAvailable:req.body.quantityAvailable,
    description:req.body.description
    });
    const newProduct=await product.save();
    if(newProduct){
        res.status(201).send({message:"New Product Created",data:newProduct})
    }
    else{
        return res.status(500).send({message:"Error in creating the product"})
    }
});
    router.put("/:id",async(req,res)=>{
        const productId=req.params.id;
        const product=await Product.findById(productId)
        if(product){
        product.category= req.body.category,
        product.productImage=req.body.productImage,
        product.productName=req.body.productName,
        product.productBrand=req.body.productBrand,
        product.productPrice=req.body.productPrice,
        product.productRating=req.body.productRating,
        product.NoofReview=req.body.NoofReview,
        product.quantityAvailable=req.body.quantityAvailable,
        product.description=req.body.description
        const updateProduct=await product.save();
        if(updateProduct){
            res.status(200).send({message:"Product Updated",data:updateProduct})
        }
        else{
            return res.status(500).send({message:"Error in updating the product"})
        }
    }});

        router.delete("/:id",async(req,res)=>{
            const deleteProduct= await Product.findById(req.params.id);
            console.log(deleteProduct);
            if(deleteProduct){
                await deleteProduct.remove();
                res.send({message:"PRODUCT DELETED"});
            }
            else{
                res.send("Error in Deletion.")
            }
        });

        router.get("/quantity/:cart",async(req,res)=>{
            const {cart}=req.params.id;
            console.log(cart);
            cart.map(async(prod)=>{
                const product=await Product.findById(prod.product);
                product.quantityAvailable=product.quantityAvailable-prod.qty;
                const updateProduct=await product.save();
                if(updateProduct){
                    res.status(200).send({message:"Product Updated",data:updateProduct})
                }
                else{
                    return res.status(500).send({message:"Error in updating the product"})
                }
    
            })  
        })
export default router;