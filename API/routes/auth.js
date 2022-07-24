
const router = require("express").Router()
const UserModel = require('../models/User')
const crypto = require('crypto-js')
const jswt = require('jsonwebtoken')

//? Register Bloc
router.post("/register", async (req, res)=>{
    const newUser = new UserModel({
        username : req.body.username,
        email    : req.body.email,
        password : crypto.AES.encrypt(req.body.password, 'Kiita').toString() 
            //todo add the "Kiita" as env variable 
            //* crypto.AES => encrypt password for security matters
    })

    try{
        const commited = await newUser.save()
            //? await key word => the .save() method is async so we need to await for the promise to reslove
        res.status(201).json(commited)
    }catch(err){
        res.status(500).json(err)
    }
})

//? Login Bloc
router.post('/login', async (req, res)=>{
    try{
        const user = await UserModel.findOne({username: req.body.username})
        const depassword = crypto.AES.decrypt(user.password, 'Kiita').toString(crypto.enc.Utf8)

        if(user && depassword === req.body.password){

            const accessToken = jswt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin
                }, 
                "Kiita", //Secret KEY
                {expiresIn: "2d"}
            )
            const {password, ...others} = user._doc
            res.status(200).json({...others, accessToken})
        }else{
            res.status(401).json('Wrong Crendentials !')
        }

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router
