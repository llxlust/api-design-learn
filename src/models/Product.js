import mongoose from "mongoose";

const ProductSchema =  new mongoose.Schema({
    name:{
        type: String,
        require: [true,"Please add a product name"]
    },
    create:{
        type: Date,
        default: Date.now,
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
    }
})
ProductSchema.virtual('updates',{
    ref: 'Update',
    localField: "_id",
    foreignField: "product",
    justOne: false,
  })
const ProductModel = mongoose.model("Product",ProductSchema);

export default ProductModel;