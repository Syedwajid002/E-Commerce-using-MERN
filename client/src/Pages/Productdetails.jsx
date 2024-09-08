import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/JavaScript/Navbar';

const Productdetails = () => {
  const navigate=useNavigate();
  const [NumberOfProducts, setNumberOfProducts] = useState(1);
  const [data, setdata] = useState({})
  const plus = () => {
    setNumberOfProducts(NumberOfProducts + 1);
  }
  const minus = () => {
    NumberOfProducts>1 ? setNumberOfProducts(NumberOfProducts - 1):setNumberOfProducts(1);


  }
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:5000/ProductsDetails/${id}`)
      .then(response => {
        setdata(response.data.result);
      })
  }, [id]);
  if (!data) {
    return (<h2>No Product details Found</h2>)
  }

  
  const AddToCart = () => {
    console.log("add to cart fnc call");
    if (!localStorage.getItem("isLoggedIn")) {
      alert("please login first");
      navigate("/login");
    } else {
      const productId = data.id;
      const userId = localStorage.getItem("id");
      console.log(userId)
     axios.post('http://localhost:5000/addtocart', { productId, userId })
      .then(response => {
        console.log("products se cart me chalegaya");
        console.log(response.data)
        navigate(`/Mycart/${userId}`);
      })
      .catch(error => {
        console.error("There was an error adding the item to the cart:", error);
      });
  }}
  const BuyNow=()=>{
    if(!localStorage.getItem("isLoggedIn")){
      alert("please login first")
      navigate("/login")
      }
      else{
        const id=data.id;
        axios.post('http://localhost:5000/buynow', {id})
        .then(response => {
          console.log("products se cart me chalegaya");
      })}
  }

  return (
    <>
    <Navbar/>
      <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
        <div className="pt-8">
          {/* <div className="flex items-center">
            <ol className="flex w-full items-center overflow-hidden">
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <Link to='/'>Home</Link>
              </li>
              <li className="text-body mt-0.5 text-base">/</li>
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <Link to='/AllProducts'>Products</Link>
              </li>
            </ol>
          </div> */}
        </div>
        <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
          <div className="col-span-2 grid grid-cols-1 gap-2.5 ">

            <div className="transition duration-150 ease-in hover:opacity-90 ">
            <div data-aos="">
            <div data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">

              <img
                src={data.image}
                alt="Nike Air Max 95 By You--0"
                className="w-full object-contain h-100"
              />
              </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 pt-8 lg:pt-0">
            <div className="mb-7 border-b border-gray-300 pb-7">

<div data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
              <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                {data.title}
              </h2>
              <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
                {data.description}
              </p>
              <div className="mt-5 flex items-center ">
                <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                  ${data.price}
                </div>
                <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                 ${data.price + 100}
                </span>
              </div>
              </div>
            </div>
            <div className="py-2 ">
              <ul className="space-y-5 pb-1 text-sm">
                <li>
                  <span className="text-heading inline-block pr-2 font-semibold">
                    Category:
                  </span>
                  <a className="hover:text-heading transition hover:underline" href="/google.com">
                    {data.category}
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
              <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                <button
                  className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                  disabled="" onClick={minus}
                >
                  -
                </button>
                <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24" >
                  {NumberOfProducts}
                </span>
                <button className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12" onClick={plus}>
                  +
                </button>
              </div>
              <button
                type="button"
                className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={AddToCart} >
                Add to cart
              </button>
              <button
                type="button"
                className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={BuyNow} >
                Buy Now
              </button>
            </div>
            <h4>Total: {NumberOfProducts * data.price}</h4>
            <div className="">
              <footer className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                  Customer Reviews
                </h2>
                <p> Rating :4.2 ⭐</p>
              </footer>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='product-details'>
        <div className='product-image'>
          <img src={data.image} alt="Black Horses" />
        </div>
        <div className='product-info'>
          <h1>{data.title}</h1>
          <p>{data.description}</p>      </div>
        </div>
      <h4>By :{data.brand}</h4>
        <div className="quantity">
        <button onClick={minus}>-</button>
        <h4>{NumberOfProducts}</h4>
        <button onClick={plus}>+</button>
      </div>
      <h5>Price :{data.price}</h5>
      {/* <p>Rating :{data.rating.count}</p> */}
      {/* <h4>Total: {NumberOfProducts * data.price}</h4>
      <button>Add to Cart</button> */}
    </>
  );
}

export default Productdetails;
