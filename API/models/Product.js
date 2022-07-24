const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
        title       : {type: String, required: true, unique: true},
        description : {type: String, required:true},
        image       : {type: Array, required:true},
        categories  : {type: Array,  required:true},
        price       : {type: Number, required:true},
        size        : {type: Array},
        color       : {type: Array}
    },
    {timestamps: true}
);


module.exports = mongoose.model('Product', ProductSchema)