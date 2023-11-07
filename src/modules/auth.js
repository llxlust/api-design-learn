import  jwt  from "jsonwebtoken";
import * as bcrypt from 'bcrypt'
export const createJWT = (user) =>{
    const token = jwt.sign({
        id: user.id,
        username: user.username,
    },
        process.env.JWT_SECRET,
    );
    return token;
}

export const protect = (req,res,next) => {
    const bearer = req.headers.authorization;
    if(!bearer){
        res.status(401);
        res.json({ message:"Not authorize"});
        return;
    }
    const [, token] = bearer.split(" ");
    console.log(token)
    if(!token){
        res.status(401);
        res.json({ message:"Not authorize"});
        return;
    }

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload;
        next();
        return;
    }catch(e){
        res.status(401);
        res.json({ message:"Not authorize wrong token!"});
        return;
    }
}


export const comparePassword = (password,hash) => {
    return bcrypt.compare(password,hash);
}

export const hashPassword = (password) => {
    return bcrypt.hash(password,5);
}