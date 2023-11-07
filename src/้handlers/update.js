import ProductModel from '../models/Product.js'
import Update from '../models/Update.js'
export const getOneUpdate = async (req,res) => {
    const id = req.params.id
    const update = await Update.findById(id)
    res.json({
        data: update,
    })
}
export const getUpdate = async (req,res) => {
    const products = await ProductModel.find({user: req.user.id}).populate("updates")
    const updates = products.reduce((allUpdates,product)=>{
        return [...allUpdates,...product.updates]
    },[])

    res.json({
        data: updates
    })
}
export const createUpdate = async (req,res) =>{
    const product = await ProductModel.findById(req.body.productId)
    if(!product){
        res.status(400);
        res.json({
            message: "product id not exist."
        })
    }
    const update = await Update.create({
        title: req.body.title,
        body: req.body.body,
        product: req.body.productId
    })
    res.json({
        data: update
    })
}

export const updateUpdate = async (req,res)=>{
    const products = await ProductModel.find({user: req.user.id}).populate("updates")

    const updates = products.reduce((allUpdates,product)=>{
        return [...allUpdates,...product.updates]
    },[])

    const match = updates.find((update) => update.id === req.params.id);
    if(!match){
        return res.json({
            message: "Cannot find update"
        })
    }

    const updatedUpdate = await Update.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.json({
        data: updatedUpdate,
    })
}

export const deleteUpdate = async (req,res)=>{
    const products = await ProductModel.find({user: req.user.id}).populate("updates")

    const updates = products.reduce((allUpdates,product)=>{
        return [...allUpdates,...product.updates]
    },[])

    const match = updates.find((update) => update.id === req.params.id);
    if(!match){
        return res.json({
            message: "Cannot find update"
        })
    }
    const deleted = await Update.findByIdAndDelete(req.params.id)

    res.json({
        message: deleted
    })
}