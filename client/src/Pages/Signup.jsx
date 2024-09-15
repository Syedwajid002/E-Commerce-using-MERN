import React, { useState } from 'react';
import './../Components/Styles/Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE from '../constants/api';

function Signup() {

  const navigate = useNavigate();

  const [data,setData] = useState({
    fullName:"",
    Email:"",
    Password:""
  });

  const submited = e => {
    e.preventDefault();
    console.log("Data submitted:", data); // Log the data being submitted
    axios.post(`${BASE}/createUser`, data)
      .then(result => {
        alert("created user please login")
        navigate("/login");
      })
      .catch(err => {
        console.log("Error:", err);
      });
  };


  const changeHandler = e =>{
    setData({...data,[e.target.name]:e.target.value});
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={submited}>
        <h2>Sign Up</h2>
        <input type="text" name="fullName" placeholder="Full Name" required onChange={changeHandler}/>
        <input type="email" name="Email" placeholder="Email" required onChange={changeHandler}/>
        <input type="password" name="Password" placeholder="Password" required onChange={changeHandler}/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
