const router = require('express').Router()
const stripe = require('stripe')('sk_test_51KgHY5IvOK6hZ4XVHWOt8udpO8hFjzAUNOqmP2Pk6ScdetBbDuchOwml8vIrL5NOXtJRQHd6TPYx3UmfhJQHcgEK00NVTYwoHY')

router.post('/payment', (req, res)=>{
    stripe.chrarges.create({
        source  : req.body.accessToken,
        ammount : req.body.ammount,
        currency: "usd"
    }, 
    (err, resp)=>{
        if(err){
            res.status(500).json(err)
        }else{
            res.status(200).json(resp)
        }
    })
})

module.exports = router