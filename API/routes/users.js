
const router = require("express").Router()
const UserModel = require('../models/User')
const crypto = require('crypto-js')
const { verifyAndAut, verifyAndAdmin } = require("./verification")


//* update
router.put('/:id', verifyAndAut, async (req,res)=>{
    if(req.body.password){
        req.body.password = crypto.AES.encrypt(req.body.password, 'Kiita').toString()
    }

    try{
        const updated = await UserModel.findByIdAndUpdate(req.params.id,{
            $set: req.body
            }, 
            {new: true}
        );

        res.status(200).json(updated)

    }catch(err){
        res.status(500).json(err)
    }
})


//* delete
router.delete('/:id', verifyAndAut, async (req, res)=>{
    try{
        await UserModel.findByIdAndDelete(req.params.id)
        res.status(204).json('User Successfully deleted !')
    }catch(err){
        res.status(500).json(err)
    }
})


//*get ?{for admin users only}
router.get('/fetch/:id', verifyAndAdmin, async (req, res)=>{
    try{
        const fetched = await UserModel.findById(req.params.id)
        const {password, ...others} = fetched._doc
        res.status(200).json(others)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})


//*get ALl ? {for admin users only}
router.get('/fetch', verifyAndAdmin, async (req, res)=>{
    const newQuery = req.query.latest

    try{
        const fetched = newQuery ?  await UserModel.find().sort({createdAt: -1}).limit(7) : await UserModel.find()
        // const {password, ...others} = fetched._doc
        res.status(200).json(fetched)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})


//*Analytics
router.get('/analytics', verifyAndAdmin, async(req, res)=>{
    const date = new Date();
    const previousYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try{
        const data = await UserModel.aggregate([
            {$match: {createdAt: {$gte: previousYear}}},
            {$project: {
                month: {$month: "$createdAt"},
            }},
            {$group:{
                _id: "$month",
                count: {$sum: 1},
            }}
        ]);

        res.status(200).json(data)

    }catch(err){
        res.status(500).json(err)
    }


})

module.exports = router


