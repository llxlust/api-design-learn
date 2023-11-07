import mongoose from "mongoose";
import ProductModel from "./Product.js";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: [true, "Please add a username"],
  },
  password: {
    type: String,
    require: [true, "Please add a password"],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.virtual('products',{
  ref: 'Product',
  localField: "_id",
  foreignField: "user",
  justOne: false,
})
///

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;