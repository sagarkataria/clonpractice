import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.ObjectId,
        ref:"User"
    },
    oderId:{
        type : String,
        required : [true  , "Please provide a order id"],
        unique : true
    },
    productId:{
        type : mongoose.Schema.ObjectId,
        ref:"product"
    },
    product_details:{
        name:String,
        image:Array
    },
    paymentId:{
        type : String,
        default : ""
    },
    payment_status:{
        type : String,
        default : ""
    },
    delivry_address:{
        type : mongoose.Schema.ObjectId,
        ref : "address"
    },
    subtotalAmt:{
        type : Number,
        default : 0
    },
    invoice_recipt:{
        type : String,
        default : ""
    },

},{timestamps:true});
const orderModel = mongoose.model('order',orderSchema);
module.exports = orderModel;