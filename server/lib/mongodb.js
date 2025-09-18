import mongoose from "mongoose";


const connectDB = async ()=>{

    mongoose.connection.on('connected', ()=>{
        console.log("Database Connected")
    })
    
    // Use provided URI and explicit dbName to avoid malformed URIs
    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.MONGODB_DB || 'puzzleParadise'
    })
};

export default connectDB;