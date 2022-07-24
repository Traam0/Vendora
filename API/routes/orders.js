const OrderModel = require('../models/Order')
const { verifyAndAdmin, verifyAccessToekn } = require('./verification')
const router = require("express").Router()


//*add new {admin users only}
router.post('/', verifyAccessToekn, async (req, res)=>{
    const newOrder = new OrderModel(req.body)

    try{
        const commited = await newOrder.save()
        res.status(201).json(commited)
    }catch(err){
        res.status(500).json(err)
    }
})

//*update {admin users only}
router.put('/:id', verifyAndAdmin, async (req, res)=>{
    try{
        const updated = await OrderModel.findOneAndUpdate(req.params.id, 
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
        await OrderModel.findByIdAndDelete(req.params.id)
        res.status(204).json("Order deleted successfully")
    }catch(err){
        res.status(500).json(err)
    }
})

//*get order {any user access}
router.get('/fetch/:uid', verifyAndAdmin, async (req, res)=>{
    try{
        const orders = await OrderModel.find({userId: req.params.uid})
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
})

//*get all orders {any user access}
router.get('/', verifyAndAdmin, async (req, res)=>{
    try{
        const orders = await OrderModel.find()
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
})

//*analytics

router.get('/analytics', verifyAndAdmin, async (req, res)=>{
    const date = new Date()
    const latestMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date( new Date().setMonth(latestMonth.getMonth() - 1))

    try{

        const data = await OrderModel.aggregate([
            {$match: {createdAt: {$gte: previousMonth}}},
            {$project: 
                {
                    month: {$month: "$createdAt"},
                    sales: "$ammount"
                }
            },
            {$group: {
                _id: "$month",
                total: {$sum: "$sales"}
            }}
        ])
        
        res.status(200).json(data)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router
