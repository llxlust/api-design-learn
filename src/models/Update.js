import mongoose from "mongoose";

export const UPDATE_STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  SHIPPED: "SHIPPED",
  DEPRECATE: "DEPRECATE",
};

const UpdateSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Please add title"],
  },
  body: {
    type: String,
    require: [true, "Please add body"],
  },
  status: {
    type: String,
    enum: [
      UPDATE_STATUS.DEPRECATE,
      UPDATE_STATUS.IN_PROGRESS,
      UPDATE_STATUS.SHIPPED,
    ],
    default: UPDATE_STATUS.IN_PROGRESS,
  },
  version:{
      type: String
  },
  asset:{
    type: String
  },
  product:{
    type: mongoose.Schema.ObjectId,
    ref:"Product"
  },
  createAt:{
    type:Date,
    default:Date.now
  },
  updateAt:{
    type:Date,
    default:Date.now
  }
});

const Update = mongoose.model("Update",UpdateSchema);

export default Update;