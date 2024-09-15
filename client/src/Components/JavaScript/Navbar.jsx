
import React, {useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cartImage from "../../Images/shopping-cart.png"
import axios from 'axios';
import BASE from '../../constants/api';

function Navbar() {
  const navigate = useNavigate();
  const [searchdata, setsearchdata] = useState("");
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [id,setId]=useState("");

  useEffect(() => {
    const getstatus = localStorage.getItem("isLoggedIn");
    if (getstatus === 'true') {
      setAuth(true);
      const getid=localStorage.getItem("id");
      setId(getid);
      const getname = localStorage.getItem("username");
      setName(getname);
    } else {
      setAuth(false);
      setId(404)
    }
  }, []);
  
  const handleonchange = (e) => {
    setsearchdata(e.target.value);
  };
  
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(searchdata);
    navigate(`/searched/${searchdata}`);
};

const Logout=async()=>{
  console.log("from frontend Logout");
  await axios.post(`${BASE}/logout`)
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  localStorage.removeItem("id")
  setAuth(false);
      setName('');
      navigate('/');

  // axios.post("http://localhost:5000/logout")
  // .then(res=>{
  // console.log(res.data)
  // })
  // .catch(err=>{
  //   console.log("error auth k jaga nav")
  // })
}
  return (
    <div>
      <nav className="navbar navbar-expand-lg text-black  p-0">
        <div className="container-fluid">
          <a className="navbar-brand  ml-16 mt-2 text-orange-500 " data-aos="zoom-out" href="/"><strong><span className='text-sky-400 mr-1'>Online</span><span className='text-orange-500'>Shop</span></strong></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="" id="navbarNav">
            <ul className="navbar-nav">
              <li className="pr-2 pl-2 text-center hover:border-b-2 hover:border-black">
                <Link to='/Products/men' >Mens</Link>
              </li>
              <li className="pr-2 pl-2 text-center hover:border-b-2 hover:border-black">
                <Link to='/Products/women'>Womens</Link>
              </li>
              <li className="pr-2 pl-2 text-center hover:border-b-2 hover:border-black">
                <Link to='/Products/electronics'>Electronics</Link>
              </li>
              <li className="pr-2 pl-2 text-center hover:border-b-2 hover:border-black">
                <Link to='/Products/jewelery'>Jewelary</Link>
              </li>
            </ul>
          </div>
        </div>
            <div onClick={()=>{
              navigate(`/Mycart/${id}`)
            }}>
            <img className='w-12 h-12 object-contain hover:border-b-2 hover:border-black' src={cartImage} alt="" />
            </div>
        <div className="container-fluid">
          <form className="d-flex w-50" role="search" onSubmit={handlesubmit}>
            <input className="form-control me-2" type="search" placeholder="Search For Items" aria-label="Search" name='searchbar' onChange={handleonchange} />
            <button className="bg-slate-500 text-white rounded-md p-1.5 " type="submit">Search</button>
          </form> 

      {auth ? (
        <div className='d-flex'>
          <p className='p-2'> {name}!</p>
          <button className='bg-slate-800 text-white rounded-lg p-2' onClick={Logout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to='/Signup'> <button className='btn btn-light m-1 '>Sign Up</button></Link>
          <Link to='/login'><button className='btn btn-primary'>Login</button></Link>
        </div>
      )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar
//to be done