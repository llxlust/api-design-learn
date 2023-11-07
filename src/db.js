import mongoose from "mongoose";

export const connectDB = async () =>{
    const conn = await mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log(`Mongo connect: ${conn.connection.host}`)
}