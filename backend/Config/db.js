
import mongoose from "mongoose";

const connectDB = async ()=>{

 try {
    mongoose.connection.on("connected" , ()=> console.log("Database Connected")
);
await mongoose.connect(process.env.MONGODB_URL, { dbName: "imageGeneration" })
 } catch (error) {
    console.error(error.message);
 }
 }

 export default connectDB;



