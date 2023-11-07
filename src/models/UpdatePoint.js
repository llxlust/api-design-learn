import mongoose from "mongoose";

const UpdatePointSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please add update name"]
    },
    description:{
        type:String,
        require: [true,"Please add a description"]
    },
    update:{
        type:mongoose.Schema.ObjectId,
        ref:"update"
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:Date,
        default:Date.now
    }
})

const UpdatePointModel = mongoose.model("UpdatePoint",UpdatePointSchema);

export default UpdatePointModel;