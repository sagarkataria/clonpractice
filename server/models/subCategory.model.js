import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    image:{
        type:String,
        default:""
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category'
        }
    ]
}, { timestamps: true })    

const subCategoryModel = mongoose.model('subCategory', subcategorySchema)
export default subCategoryModel;