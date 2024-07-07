const mongoose=require('mongoose');
const cartSchema = new mongoose.Schema({
    items: [{
        productId: String,
        productTitle: String,
        productImage: String,
        productPrice: Number
    }]
});


module.exports = mongoose.model("Cart",cartSchema);
