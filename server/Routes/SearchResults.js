const express=require('express');
const Products=require('./../models/Products')
const app = express();


const SearchedQuery= async (req, res) => {
    const { query } = req.body;
    // console.log(query + "fhksjfk")
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
  
    const results = await Products.find()
    const searcheddata = results.filter(item => item.category.toLowerCase().includes(query))
    res.json({ result: searcheddata });
  };
  module.exports=SearchedQuery;