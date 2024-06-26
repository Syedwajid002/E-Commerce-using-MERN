
import React, {useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cartImage from "../../Images/shopping-cart.png"
import axios from 'axios'

function Navbar({auth,name}) {
  const navigate = useNavigate();
  const [searchdata, setsearchdata] = useState("");
  const handleonchange = (e) => {
    setsearchdata(e.target.value);
  };
  
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(searchdata);
    navigate(`/searched/${searchdata}`);
};

const Logout=()=>{
  axios.post("http://localhost:5000/logout")
  .then(res=>{
  console.log(res.data)
  })
  .catch(err=>{
    console.log("error auth k jaga nav")
  })
}
  return (
    <div>
      <nav className="navbar navbar-expand-lg text-black bg-#f4f4f4 p-0 ">
        <div className="container-fluid">
          <a className="navbar-brand text-black " href="/"><strong>MY-STORE</strong></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="" id="navbarNav">
            <ul className="navbar-nav">
              <li className="p-2 text-center">
                <Link to='/Products/men' >Mens</Link>
              </li>
              <li className="p-2 text-center">
                <Link to='/Products/women'>Womens</Link>
              </li>
              <li className="p-2 text-center">
                <Link to='/Products/electronics'>Electronics</Link>
              </li>
              <li className="p-2 text-center">
                <Link to='/Products/jewelery'>Jewelary</Link>
              </li>
            </ul>
          </div>
        </div>
            <div>
            <Link to="/mycart"><img className='w-10 h-12 object-contain' src={cartImage} alt="" /></Link>
            </div>
        <div className="container-fluid">
          <form className="d-flex w-50" role="search" onSubmit={handlesubmit}>
            <input className="form-control me-2" type="search" placeholder="Search For Items" aria-label="Search" name='searchbar' onChange={handleonchange} />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>

      {auth ? (
        <div className='d-flex'>
          <p className='p-2'> {name}!</p>
          <button className='btn btn-secondary' onClick={Logout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to='/Signup'> <button className='btn btn-light'>Sign Up</button></Link>
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