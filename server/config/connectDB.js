import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(process.env.NODE_ENV === "development"){
    console.log("Development Mode");
}
if(process.env.NODE_ENV === "production"){
    console.log("Production Mode");
}

if(!process.env.MONGODB_URI){
    throw new Error("Please provide a mongo uri");
}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Failed");
        process.exit(1);
    }
}
export default connectDB;