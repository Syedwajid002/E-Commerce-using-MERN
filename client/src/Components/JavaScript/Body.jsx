import React,{useRef} from 'react'
import '../Styles/Body.css'
import BoxesScroll from './BoxesScroll'
function Body() {
    const targetRef = useRef(null);
    const scrollToComponent = () => {
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
      };
    return (
        
        <div className="fullbody">
        <div className="body">
        <div className="mainHeadings">
           <b><h2 className='text-center  text-4xl'>Buy anything you want</h2></b>
        </div>
        <div className="sideheading">
            <h1 className='text-bold text-3xl'>Raining Offers For</h1>
            <h1 className='text-bold text-3xl'> Hot summer</h1>
            <h3 className='text-bold text-3xl'>Great Deals upto 50% OFF</h3>
        <button onClick={scrollToComponent} className='bg-slate-300 hover:bg-gray-200'>Shop Now</button>
        </div>
        </div>
        <BoxesScroll ref={targetRef} />
        </div>
    )
}

export default Body