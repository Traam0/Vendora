const jwt = require('jsonwebtoken');

function verifyAccessToekn(req, res, next){
    const header = req.headers.token

    if(header){
        const token = header
        jwt.verify(token, 'Kiita', (err, user)=>{
            if(err){
                return res.status(401).json('Invalid Token!')
            }else{
                req.user = user
                next()
            }
        })
    }else{
        return res.status(401).json('You are not authenticated!')
    }
}


function verifyAndAut(req, res, next){
    verifyAccessToekn(req, res, ()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json('Action Denied!')
        }
    })
}

function verifyAndAdmin(req, res, next){
    verifyAccessToekn(req, res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json('Action Denied')
        }
    })
}

module.exports = { verifyAccessToekn ,verifyAndAut, verifyAndAdmin };