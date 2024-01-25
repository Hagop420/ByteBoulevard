import React, { useState, useEffect } from 'react';
import { useCart } from './useCart';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa';
import '../css/nightTalc.css';
import { countPrice, toDollars } from '../lib/toDollars';

export function ThankYouForYourOrder() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'retro'
  );

  function handleToggle(e) {
    if (e.target.checked) {
      setTheme('night');
    } else {
      setTheme('retro'); //light
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html')?.setAttribute('data-theme', localTheme);
  }, [theme]);

  return (
    <>
      {/* HOME PAGE */}
      <Link to="/">
        <div className="flex text-black justify-start float-right text-4xl BLBL hover:text-zinc-800">
          <FaHome />
        </div>
      </Link>
      {/* END HOME */}

      {/* Light and dark mode component rendering */}
      <div className="flex relative bottom-5 m-4 justify-between items-start">
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === 'retro' ? false : true}
          />

          {/* sun icon */}
          <svg
            className="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off fill-current w-10 h-10 text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
      {/* end Light and dark mode section */}

      <h1 className="font-bold text-black BLBL">Thank you for your order</h1>
      <p className="text-black BLBL m-5">Your preparation items:</p>
      <div>
        <MappedItem />
      </div>

      <div className="flex flex-col justify-center items-center">
        <AmountPaid />
      </div>
    </>
  );
}

export function MappedItem() {
  const { cartItems } = useCart();

  return (
    <div className="grid grid-rows-3 grid-cols-3 grid-flow-col md:grid-rows-3 md:grid-cols-1 lg:grid-rows-4">
      {cartItems.map((item) => (
        <div key={item.foodId} className="">
          <img
            src={item.imageUrl}
            alt="Your_Orders."
            className="h-56 object-contain m-auto"
          />
          <div className="text-center m-2">
            <p className="text-black BLBL">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AmountPaid() {
  const { cartItems } = useCart();
  return (
    <React.Fragment>
      <div className="text-green-600 text-5xl">
        <FaDollarSign />
      </div>

      <span className="m-3">
        <p className="text-black BLBL">
          Amount Paid:{' '}
          <span className="font-bold">{toDollars(countPrice(cartItems))}</span>
        </p>
      </span>
    </React.Fragment>
  );
}
