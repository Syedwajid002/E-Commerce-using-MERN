import React, { useEffect, useState } from 'react'
import Navbar from '../Components/JavaScript/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Cart = () => {
const navigate=useNavigate();
    const [cart, setCart] = useState([]);
    const { id } = useParams();
    const [total, setTotal] = useState(0);
    useEffect(() => {
        console.log("aagaya cart me")
        axios.get("http://localhost:5000/getCart")
            .then(response => {
                setCart(prevCart => [...prevCart, response.data]);
                setTotal(prevTotal => prevTotal + response.data.price)
                // console.log("Cart data:", response.data);
            })
            .catch(err => {
                console.log("Error occurred in addtocart: " + err);
            });
    }, [id])
    const cartitem=(id)=>{
        navigate(`/productdetails/${id}`);
    }
    return (
        <>
            <Navbar />
            <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
                <h2 className="text-3xl font-bold">Your cart</h2>
                <ul className="flex flex-col divide-y divide-gray-200">

                {cart.length>0 ? cart.map(item=>(
                    <li className="flex flex-col py-6 sm:flex-row sm:justify-between bg-white px-3 rounded-2xl shadow-lg">
                        <div className="flex w-full space-x-2 sm:space-x-4">
                            <img
                                className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                                src={item.image} alt="Nike Air Force 1 07 LV8"
                            />
                            <div className="flex w-full flex-col justify-between pb-4">
                                <div className="flex w-full justify-between space-x-2 pb-2">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold">{item.price}</p>
                                    </div>
                                </div>
                                <div className="flex divide-x text-sm">
                                    <button
                                        type="button"
                                        className="flex items-center space-x-2 px-2 py-1 pl-0 bg-white rounded"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="lucide lucide-trash"
                                        >
                                            <path d="M3 6h18"></path>
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                        </svg>
                                        <span>Remove</span>
                                    </button>
                                    <button type="button" className="flex items-center space-x-2 px-2 py-1  bg-white rounded mx-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="lucide lucide-heart"
                                        >
                                            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                                        </svg>
                                        <span>Add to favorites</span>
                                    </button>
                                    <button >Details</button>
                                </div>
                            </div>
                        </div>
                    </li>)):<p>No item in cart</p>}
                </ul>
                <div className="space-y-1 text-right">
                    <p>
                        Total amount:<span className="font-semibold">{total}</span>
                    </p>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        <Link to="/">
                            Back to shop</Link>
                    </button>
                    <button
                        type="button"
                        className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        <Link to="/Checkout">
                            Checkout</Link>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Cart