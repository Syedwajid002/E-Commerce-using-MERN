import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  }, []);
  if (!data) {
    return (<h2>No Product details Found</h2>)
  }

  const AddToCart = () => {
    
    console.log("cart")
      navigate(`/Mycart/${data.id}`)
  }

  return (
    <>
      <div class="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
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
        <div class="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
          <div class="col-span-2 grid grid-cols-1 gap-2.5 ">

            <div class="transition duration-150 ease-in hover:opacity-90 ">
              <img
                src={data.image}
                alt="Nike Air Max 95 By You--0"
                class="w-full object-contain h-100"
              />
            </div>
          </div>
          <div class="col-span-4 pt-8 lg:pt-0">
            <div class="mb-7 border-b border-gray-300 pb-7">
              <h2 class="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                {data.title}
              </h2>
              <p class="text-body text-sm leading-6  lg:text-base lg:leading-8">
                {data.description}
              </p>
              <div class="mt-5 flex items-center ">
                <div class="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                  ${data.price}
                </div>
                <span class="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                 ${data.price + 100}
                </span>
              </div>
            </div>
            <div class="py-2 ">
              <ul class="space-y-5 pb-1 text-sm">
                <li>
                  <span class="text-heading inline-block pr-2 font-semibold">
                    Category:
                  </span>
                  <a class="hover:text-heading transition hover:underline" href="/google.com">
                    {data.category}
                  </a>
                </li>
              </ul>
            </div>
            <div class="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
              <div class="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                <button
                  class="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                  disabled="" onClick={minus}
                >
                  -
                </button>
                <span class="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24" >
                  {NumberOfProducts}
                </span>
                <button class="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12" onClick={plus}>
                  +
                </button>
              </div>
              <button
                type="button"
                class="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={AddToCart} >
                Add to cart
              </button>
            </div>
            <h4>Total: {NumberOfProducts * data.price}</h4>
            <div class="">
              <header class="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                <h2 class="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                  Customer Reviews
                </h2>
                <p> Rating :</p>
              </header>
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
