import React, { useState } from 'react';
import './../Components/Styles/Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE from '../constants/api';

function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        Email: "",
        Password: ""
    });

    const changed = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submited = (e) => {
        e.preventDefault();
        axios.post('https://e-commerce-using-mern-cng7.onrender.com/login', 
            data, {
            withCredentials: true, 
          });
          
            .then(result=> {
                console.log("Login successful:", result);
                localStorage.setItem("username",result.data.username)
                localStorage.setItem("isLoggedIn",true)
                localStorage.setItem("id",result.data.userId)
                navigate("/");
            })
            .catch((err) => {
                console.error("Login error:", err);
                alert("Login failed. Please check your credentials and try again.");
                navigate("/")
            });
    };

    return (
        <div>
            <div className="signup-container">
                <form className="signup-form" onSubmit={submited}>
                    <h2>Login</h2>
                    <h4>Welcome Back!</h4>
                    <input type="email" placeholder="Email" required onChange={changed} name='Email' value={data.Email} />
                    <input type="password" placeholder="Password" required onChange={changed} name='Password' value={data.Password} />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
