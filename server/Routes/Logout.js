const express=require('express');

const app = express();

const Logout=async (req, res) => {
    console.log("logout")
    res.clearCookie('token');
    return res.json({ message: 'Logout successful' });
  }

  module.exports=Logout;
