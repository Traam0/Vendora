const CartModel = require('../models/Cart')
const { verifyAccessToekn, verifyAndAut, verifyAndAdmin } = require('./verification')
const router = require("express").Router()




router.post('/', verifyAccessToekn, async (req, res)=>{
    const newCart = new CartModel(req.body)

    try{
        const commited = await newCart.save()
        res.status(201).json(commited)
    }catch(err){
        res.status(500).json(err)
    }
})

//*update {admin users only}
router.put('/:id', verifyAndAut, async (req, res)=>{
    try{
        const updated = await CartModel.findOneAndUpdate(req.params.id, 
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
router.delete('/:id', verifyAndAut, async (req, res)=>{
    try{
        await CartModel.findByIdAndDelete(req.params.id)
        res.status(204).json("Cart deleted successfully")
    }catch(err){
        res.status(500).json(err)
    }
})

//*get cart {any user access}
router.get('/fetch/:uid', verifyAndAut, async (req, res)=>{
    try{
        const cart = await CartModel.findOne({userId: req.params.uid})
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
})

//*get all carts {any user access}
router.get('/', verifyAndAdmin, async (req, res)=>{
    try{
        const carts = await CartModel.find()
        res.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router
