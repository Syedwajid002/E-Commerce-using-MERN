import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        axios.post(`${BASE}/api/login`,
            data, {
            withCredentials: true,
        })
            .then(result => {
                console.log("Login successful:", result);
                localStorage.setItem("username", result.data.username)
                localStorage.setItem("isLoggedIn", true)
                localStorage.setItem("id", result.data.userId)
                navigate("/");
            })
            .catch((err) => {
                console.error("Login error:", err);
                alert("Login failed. Please check your credentials and try again.");
                navigate("/")
            });
    };

    return (
        <div className='flex justify-center align-middle content-center'>
                <form className="w-72 flex-col align-middle justify-center text-center border-1 border-b rounded-md border-gray-300 p-2m-0">
                    <h2 className='text-3xl border-b-4 '>Login</h2>
                    <h4 className='text-xl'>Welcome Back Please Login To Continue</h4>
                    <input type="email" placeholder="Email" required onChange={changed} name='Email' value={data.Email} className='border-2 rounded-md p-2 mb-2'/>
                    <br />
                    <input type="password" placeholder="Password" required onChange={changed} name='Password' value={data.Password} className='border-2 rounded-md p-2'/>
                    <p className='text-xs mt-2'>Don't have an account ? <a href="/signup">signup</a></p>
                    <Link to='/Signup'> <button className='bg-white text-black p-1.5 rounded-lg w-28 border-2 m-2'>Sign Up</button></Link>
                    <button type="submit" className='bg-blue-600 text-black p-1.5 rounded-lg w-28 border-2 m-2' onClick={submited}>Login</button>
                </form>
                </div>
    );
}

export default Login;
