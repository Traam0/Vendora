const router = require("express").Router()
const ProductModel = require('../models/Product');
const { verifyAndAdmin } = require("./verification");


//*add new {admin users only}
router.post('/', verifyAndAdmin, async (req, res)=>{
    const newProduct = new ProductModel(req.body)

    try{
        const commited = await newProduct.save()
        res.status(201).json(commited)
    }catch(err){
        res.status(500).json(err)
    }
})

//*update {admin users only}
router.put('/:id', verifyAndAdmin, async (req, res)=>{
    try{
        const updated = await ProductModel.findOneAndUpdate(req.params.id, 
            {
                $set: req.body
            },
            {new: true}
        )

        res.status(200).json(updated)
    }catch(err){
        res.status(500).json(err)
    }
})

//*delete {admi access only}
router.delete('/:id', verifyAndAdmin, async (req, res)=>{
    try{
        await ProductModel.findByIdAndDelete(req.params.id)
        res.status(204).json("Product deleted successfully")
    }catch(err){
        res.status(500).json(err)
    }
})

//*get products {any user access}
router.get('/fetch/:id', async (req, res)=>{
    try{
        const product = await ProductModel.findById(req.params.id)
        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err)
    }
})

//*get all products {any user access and guests}
router.get('/fetch', async (req, res)=>{
    const newQuery = req.query.latest;
    const categoryQuery = req.query.category

    try{
        let products;

        if(newQuery == 'true'){
            products = await ProductModel.find().sort({createdAt: -1}).limit(8)
        }else if(categoryQuery){
            products = await ProductModel.find({categories: {$in: [categoryQuery]}})
        }else{
            products = await ProductModel.find()
        }

        res.status(200).json(products)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router
