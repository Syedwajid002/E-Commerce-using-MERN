
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
  const [id,setId]=useState(134);

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
}
  return (
    <div className='md:flex justify-center md:justify-between bg-[#F3F2F4] pt-2'>
        <div className="flex justify-between">
          <a className="ml-2 mt-2 text-orange-500 " data-aos="zoom-out" href="/"><strong><span className='text-sky-400 mr-1 text-2xl text-center '>Online</span><span className='text-orange-500'>Shop</span></strong></a>
          {auth ? (<p className='p-1.5 mb-2 mt-2 mr-2'> {name}!</p>):(
            <Link to='/login'><button className='bg-blue-600 text-white p-1.5 mb-2 mt-2 mr-2 rounded-lg'>Login</button></Link>
          )}
          
          </div>
          <div className="hidden justify-between md:flex">
            <ul className="flex">
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
        <div className="flex justify-center">
          <form className="flex rounded-md " role="search" onSubmit={handlesubmit}>
            <input className="border-1 rounded-xl pl-1 pr-1 mr-2" type="search" placeholder="Search For Items" aria-label="Search" name='searchbar' onChange={handleonchange} />
            <button className="bg-black hover:bg-green-600 text-white rounded-lg p-1.5 " type="submit">Search</button>
          </form> 
          </div>
      {auth ? (
        <div className='hidden justify-center md:flex'>
      <div onClick={()=>{
              navigate(`/Mycart/${id}`)
            }}>
            <img className='w-8 h-8 object-contain hover:border-b-2 hover:border-black p-0.5 mr-2' src={cartImage} alt="" />
            </div>
          <p className=''> {name}!</p>
          <button className='bg-slate-800 text-white rounded-lg' onClick={Logout}>Logout</button>
        </div>
      ) : (
        <div className='hidden md:flex'>  <div onClick={()=>{
          navigate(`/Mycart/${id}`)
        }}>
        <img className='w-8 h-8 object-contain hover:border-b-2 hover:border-black p-0.5 mr-2' src={cartImage} alt="" />
        </div>
          <Link to='/login'><button className='bg-blue-600 text-white p-1.5 rounded-lg'>Login</button></Link>
        </div>
      )}
    </div>
  );
}

export default Navbar
//to be done