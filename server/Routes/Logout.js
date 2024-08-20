const express=require('express');

const app = express();

const Logout=(req, res) => {
    console.log("logout")
    res.clearCookie('token');
    console.log("hora bhai logout");
    return res.json({ message: 'Logout successful' });
  }

  module.exports=Logout;
