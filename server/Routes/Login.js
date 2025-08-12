const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./../models/user');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:3000', 
//   credentials: true,
// }));

const Login = async (req, res) => {
  try {
    console.log("login called")
    const { Email, Password } = req.body;
    const user = await userModel.findOne({ Email });
    console.log("reached login")
    if (!user) {
      console.log("User not found"); 
      return res.status(401).json({
        success: false,
        message: "Invalid email"
      });
    }
    console.log("first")
    const isPasswordCorrect = await bcrypt.compare(Password, user.Password);
    if (!isPasswordCorrect) {
      console.log("pwd")
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }
    console.log("pwdpass")
    let token = jwt.sign({ id: user._id }, "hfjksdhfkhsdkfhksdfh", { expiresIn: "1h" });
    console.log("tpass")
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: "strict"
    }).json({
      success: true,
      message: "Login Successful",
      username: user.name,
      userId: user._id
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = Login;
