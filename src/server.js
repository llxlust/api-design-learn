import express from 'express';
import { connectDB } from './db.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './router.js'
import { protect } from './modules/auth.js';
import { createNewUser, signin } from './้handlers/user.js';

dotenv.config();
connectDB();

const app = express();
const PORT = 3100;

// app.use(morgan("dev"));
app.use(express.json());
// app.use(express.urlencoded({extended:true}))

app.use("/api",protect,router);
app.post("/user",createNewUser);
app.post("/signin",signin);

app.use((err,req,res,next)=>{
    res.json({
        messsage:`${messsage.err}`
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

