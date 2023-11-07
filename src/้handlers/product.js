import Product from '../models/Product.js'
import UserModel from '../models/User.js'
export const getProducts = async (req,res) => {
    console.log(req.user)
    const user = await UserModel.findById(req.user.id).populate("products");

    res.json({
        data: user.products,
    });
};
export const getOneProduct = async (req,res) => {
    const id = req.param.id;
    const product = await Product.findOne({
        id,
        user: req.user.id
    })
    res.json({data:product})
}

export const createProduct = async (req,res) => {
    const product = await Product.create({
        name: req.body.name,
        user: req.user.id
    });
    res.json({
        data: product,
    })
}
export const deletProduct = async (req,res) => {
    const deleted = await Product.deleteOne({
        _id:req.params.id,
        user:req.user.id,
    })
    res.json({
        data: deleted
    })
}
export const updateProduct = async (req,res) => {
    const updated = await Product.findOneAndUpdate({
        _id:req.params.id,
        user:req.user.id
    },{
        name: req.body.name,
    },{
        new: true,
    }
    )
    res.json({
        data: updated,
    })
}