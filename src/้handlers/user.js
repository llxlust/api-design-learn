import { compare } from "bcrypt";
import UserModel from "../models/User.js"
import { comparePassword, createJWT, hashPassword } from "../modules/auth.js"

export const createNewUser = async (req,res) => {
    console.log(req.body)
    const hash = await hashPassword(req.body.password)
    const user = await UserModel.create({
        username: req.body.username,
        password: hash,
    });

    const token = createJWT(user);
    res.json({
        token,
    })
}

export const signin = async (req,res) => {
    const user = await UserModel.findOne({
        username:req.body.username
    })
    if(user){
        const isValid = await comparePassword(req.body.password,user.password)
        if(!isValid){
        res.status(401);
        res.json({
            message:"Invalid username or password"
        })
        return;
        }

    const token = createJWT(user);
     res.json({token});
    }else{
        res.json({
            message:"Invalid username or password"
        })
    }
}