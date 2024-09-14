const express = require('express');
const app = express();
const userModel = require('./../models/user');
const bcrypt = require('bcrypt');


const Signup = async (req, res) => {
    const { fullName, Email, Password } = req.body;
    console.log("aaya signupwale me")
    let user = await userModel.findOne({ Email });
    console.log(user);
    if (user) return res.status(404).json({
        success: false,
        message: "User already exist"
    })
    console.log("ni mila")
    const hashedpassword = await bcrypt.hash(Password, 10)
    // console.log(hashedpassword)
    user = await userModel.create({
        name: fullName,
        Email: Email,
        Password: hashedpassword
    })
    res.status(200).json({
        sucess: true,
        message: "User created Successfully"
    })
}

module.exports = Signup;