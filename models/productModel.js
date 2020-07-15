import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    category:{type:String,required:true},
    productImage:{type:String,required:true},
    productName:{type:String,default:false,required:true},
    productBrand:{type:String,default:false,required:true},
    productPrice:{type:Number,default:0,required:true},
    productRating:{type:Number,default:0,required:true},
    detail:{type:String,required:true},
    quantityAvailable:{type:Number,default:0,required:true},
    description:{type:String,required:true}
});

const productModel=mongoose.model("Product",productSchema);

export default productModel;
