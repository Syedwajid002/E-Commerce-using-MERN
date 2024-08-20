const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./../models/user'); // Adjust the path as necessary
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())

const Login= async (req, res) => {
    try {
      const { Email, Password } = req.body;
      const user = await userModel.findOne({ Email })
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email"
        });
      }
  
      const isPasswordCorrect = await bcrypt.compare(Password, user.Password);
      if (!isPasswordCorrect) {
        return res.status(401).json({
          success: false,
          message: "Invalid password"
        });
      }
      
      let token = jwt.sign({ id: user._id}, "hfjksdhfkhsdkfhksdfh",{expiresIn:"1h"});
      res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict"
      }).json({
        success: true,
        message:"Login Successfull",
        username:user.name,
        userId:user._id
      });
  
    }
    catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
    
  };
  module.exports=Login;