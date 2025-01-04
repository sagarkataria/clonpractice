import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide a name"],
    },
    email:{
        type:String,
        required:[true, "Please provide a email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Please provide a password"],
    },
    avatar:{
        type:String,
        default:""
    },
    mobile:{
        type:Number,
        default:null
    },
    refresh_token:{
        type:String,
        default:""
    },
    verify_email:{
       type:Boolean,
       default:false
    },
    last_login_date:{
        type:Date,
        default:""
    },
    status:{
        type:String,
        enum:["Active","Inactive","Suspended"],
        default:"Active"
    },
    address_details:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"address"
        }
    ],
    shoping_cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"cartProduct"
        }
    ],
    order_history:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"order"
        }
    ],
    forgot_password_otp:{
        type:String,
        default:null
    },
    forgot_password_expiry:{
        type:Date,
        default:""
    },
    role:{
        type:String,
        enum:["User","Admin"],
        default:"User"
    }
},{
    timestamps:true
})

const userModel = mongoose.model("User",userSchema);
export default userModel;