const mongoose=require('mongoose');
const  User=require('./user');
const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    items: [{
        productId: String,
        productTitle: String,
        productImage: String,
        productPrice: {
            type:Number
        }
    }]
});


module.exports = mongoose.model("Carts",cartSchema);
