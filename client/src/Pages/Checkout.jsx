import React from 'react'
import Navbar from '../Components/JavaScript/Navbar'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const Checkout = () => {

  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const { id } = useParams();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      alert('Please login first');
      navigate('/login');
    } else {
      const userId = localStorage.getItem('id');
      console.log(userId);
      axios
        .get(`http://localhost:5000/getCart/${userId}`)
        .then(response => {
          console.log('Response has come');
          const items = response.data.items;
          setCart(items);
          console.log(items);
          const totalPrice = items.reduce((sum, item) => sum + item.productPrice, 0);
          setTotal(totalPrice);
        })
        .catch(err => {
          console.log('Error occurred in addtocart: ' + err);
        });
    }

  }, [id, navigate]);
  return (
    <>
      <Navbar />
      <div class="mx-auto my-4 max-w-4xl md:my-6">
        <div class="overflow-hidden  rounded-xl shadow">
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="bg-white-100 px-5 py-6 md:px-8">
              <div class="flow-root">
                <ul class="-my-7 divide-y divide-gray-200">
                  {cart.map(item=>(
                  <li key={item._id} class="flex items-stretch justify-between space-x-5 py-7">
                    <div class="flex flex-1 items-stretch">
                      <div class="flex-shrink-0">
                        <img
                          class="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                          src={item.productImage}
                          alt="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png"
                        />
                      </div>
                      <div class="ml-5 flex flex-col justify-between">
                        <div class="flex-1">
                          <p class="text-sm font-bold">{item.productTitle}</p>
                        </div>
                        <p class="mt-4 text-xs font-medium ">x 1</p>
                      </div>
                    </div>
                    <div class="ml-auto flex flex-col items-end justify-between">
                      <p class="text-right text-sm font-bold text-gray-900">
                        {item.productPrice}
                      </p>
                      <button
                        type="button"
                        class="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      >
                        <span class="sr-only">Remove</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="h-5 w-5"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </li> ))}
                </ul>
              </div>
              <hr class="mt-6 border-gray-200" />
              <ul class="mt-6 space-y-3">
                <li class="flex items-center justify-between text-gray-900">
                  <p class="text-sm font-medium ">Total</p>
                  <p class="text-sm font-bold ">{total}</p>
                </li>
              </ul>
            </div>
            <div class="px-5 py-6 text-gray-900 md:px-8">
              <div class="flow-root">
                <div class="-my-6 divide-y divide-gray-900">
                  <div class="py-6">
                    <h2 class="text-base  font-bold">Contact Information</h2>
                    <form action="#" class="mt-6">
                      <div class="space-y-5">
                        <div class="grid w-full max-w-sm items-center gap-1.5">
                          <label
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="name"
                          >
                            Full Name
                          </label>
                          <input
                            class="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            id="name"
                            placeholder="Full Name"
                          />
                        </div>
                        <div class="grid w-full max-w-sm items-center gap-1.5">
                          <label
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="email"
                          >
                            Email
                          </label>
                          <input
                            class="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="email"
                            id="email"
                            placeholder="Email"
                          />
                        </div>
                        <div>
                          <button
                            type="button"
                            class="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                          >
                            Get Started
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="py-6">
                    <h2 class="text-base font-bold text-gray-500">
                      Shipping Information
                    </h2>
                  </div>
                  <div class="py-6">
                    <h2 class="text-base font-bold text-gray-500">
                      Billing Information
                    </h2>
                  </div>
                  <div class="py-6">
                    <h2 class="text-base font-bold text-gray-500">Payment Method</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Checkout