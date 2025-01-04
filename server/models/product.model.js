import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide a name"],
    },
    image:{
        type:Array,
        default:[]
    },
    category:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'category'
        }
    ],
    subcategory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'subCategory'
        }
    ],
    type:{
        type:String,
        default:""
    },
    stock:{
        type : Number,
        default:null
    },
    price:{
        type:Number,
        default:null
    },
    discount:{
        type:Number,
        default:null
    },
    description:{
        type:String,
        default:""
    },
    more_details:{
        type:Object,
        default:{}
    },
    publish:{
        type:boolean,
        default:true
    }
},{timestamps:true});

const productModel = mongoose.model('product',productSchema)
module.exports = productModel;