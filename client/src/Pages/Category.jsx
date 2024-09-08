import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import './../Components/Styles/BoxesScroll.css'
import { Link } from 'react-router-dom';
const Category = () => {

const {Category}=useParams();
const [data,setData]=useState();
const navigate=useNavigate();

    useEffect(()=>{
        axios.post("http://localhost:5000/SearchResults",{query:Category})
        .then(response=>{
            console.log(response.data.result);
                setData(response.data.result);
        })
        .catch(err=>{console.log("Error Category me"+err)})
    },[])


    const productclick=(item)=>{
        navigate(`/productdetails/${item.id}`);
      }

  return (
    <>
    <div class="pt-8">
    <div class="flex items-center">
      <ol class="flex w-full items-center overflow-hidden">
        <li class="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
          <Link to='/'>Home</Link>
        </li>
        <li class="text-body mt-0.5 text-base">/</li>
        <li class="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
        <Link to='/AllProducts'>Products</Link>
        </li>
      </ol>
    </div>
  </div>
    <h2><u>Searched Products</u></h2>
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