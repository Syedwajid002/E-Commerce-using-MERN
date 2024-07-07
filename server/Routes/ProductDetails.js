const express=require('express');
const Products=require('./../models/Products')
const app = express();

app.use(express.json());
const ProductDetails=async (req, res) => {
    const { id } = req.params;
    const result = await Products.findOne({ id: id });
    res.json({ result });
  };


  module.exports=ProductDetails;