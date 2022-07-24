
const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')
const PORT = 5000
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/products')
const cartRoute = require('./routes/carts')
const orderRoute = require('./routes/orders')

app.use(express.json())
app.use(cors({
    origin: ["http://127.0.0.1:5500", 'http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500']
}))

mongoose.connect("" /* Your mongo connect url */) //todo add the "mongodb+srv" as an env variable
    .then(()=>{console.log('db connection successful')})
.catch(err=>{
    console.log(err)
})

app.use('/vendora/api/auth', authRoute)
app.use('/vendora/api/users', userRoute)
app.use('/vendora/api/products', productRoute)
app.use('/vendora/api/carts', cartRoute)
app.use('/vendora/api/orders', orderRoute)

app.get('/vendora/api/ping', (req, res)=>{
    res.status(200).json({
        status: 200,
        body: "hi (●'◡'●)"
    })
})

app.listen(PORT, ()=>{
    console.log('BackEnd Server is up and running 🔥')
} )
