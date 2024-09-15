import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import './../Components/Styles/BoxesScroll.css'
import { Link } from 'react-router-dom';
import Navbar from '../Components/JavaScript/Navbar';
import BASE from '../constants/api';
const Category = () => {

const {Category}=useParams();
const [data,setData]=useState();
const navigate=useNavigate();

    useEffect(()=>{
      console.log(Category);
        axios.post(`${BASE}/SearchResults`,{query:Category})
        .then(response=>{
                setData(response.data.result);
        })
        .catch(err=>{console.log("Error Category me"+err)})
    },[])


    const productclick=(item)=>{
        navigate(`/productdetails/${item.id}`);
      }

  return (
    <>
    <Navbar/>
    <h2 className='flex items-center place-content-center text-2xl font-bold'><u>Searched Products</u></h2>
      <div className="wrapper">
        {data && data.map(item => (
          <div data-aos="fade-out"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="500">
          <div className="Item" key={item.id} onClick={()=>{productclick(item)}}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <p>{item.description.length>20 ? item.description.substring(4,50) + "...":item.description}</p>
            <p><strong>Price:</strong> ${item.price}</p>
          </div>
          </div>

        ))}
      </div>
    </>
  )
}

export default Category