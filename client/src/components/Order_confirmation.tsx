import { useState, useEffect } from 'react';
import { useCart } from './useCart';
import { Link } from 'react-router-dom';
import '../css/nightTalc.css';
import { countItems, countPrice, toDollars } from '../lib/toDollars';
import noFoodDisplayed from '../img/noFoodDisplayed.png';

export function OrderConfirmation() {
  // THEME STATE
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'retro'
  );

  // button pulsing animation state
  const scaledBtn =
    'transform scale-125 transition-transform duration-600 hover:scale-100';

  // ARRAY STATE FOR JOINED METHOD

  // THEME from daisyUI effects and function

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

  const { cartItems, removeItemCompletely, btnPulse } = useCart();

  // REMOVING FROM CART FUNCTION

  if (cartItems.length === 0) {
    return (
      <>
        <div className="flex m-5">
          <Link to="/menu">
            <span className="relative flex h-3 top-2 w-3 WHITE_ANIM">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black WHITE_ANIM opacity-75 hover:animation-none"></span>
              <span className="relative WHITE_ANIM inline-flex rounded-full h-3 w-3 bg-black"></span>
            </span>
            <button className="btn text-black WHWH BLB">Back to menu</button>
          </Link>
        </div>
        {/* Light and dark mode component rendering */}
        <div className="flex mb-3 justify-end">
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

        {/* // nothing inside of cart function */}
        <div className="text-4xl text-black BLBL font-bold">
          <div>
            No Items in cart
            <div className="flex justify-center rotate-6 text-7xl">🛒</div>
          </div>
        </div>
        <img src={noFoodDisplayed} alt="Krusty_Krab" />
      </>
    );
  }

  return (
    <>
      {/* Light and dark mode component rendering */}
      <div className="flex mb-3">
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

      <div className="flex">
        <h1 className="capitalize text-black BLBL">Order summary</h1>
      </div>

      {/* IMAGES INSIDE THE CART */}

      <div className="grid grid-rows-3 grid-flow-col gap-10">
        {cartItems?.map((joinedFoodArr) => (
          <div key={joinedFoodArr.foodId}>
            <Link to={`/product/${joinedFoodArr.foodId}`}>
              <img
                src={joinedFoodArr.imageUrl}
                alt=""
                className="h-56 object-contain"
              />
            </Link>
            <div className="m-4 text-start text-black">
              <p className="BLBL">{joinedFoodArr.name}</p>
              <p className="BLBL">Quantity: {joinedFoodArr.quantity}</p>
              <p className="BLBL">Price: {toDollars(joinedFoodArr.price)}</p>
              <p
                className="underline bg-orange-300 w-20 rounded text-center  font-bold remBtn border-0 btn-outline hover:cursor-pointer hover:opacity-90 hover: text-slate-800 hover:bg-slate-200 NIGHT"
                onClick={() => removeItemCompletely(joinedFoodArr.foodId)}>
                Remove
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <p className="text-black BLBL">
          Total: {toDollars(countPrice(cartItems))}
        </p>
      </div>

      <Link to="/thanks_for_your_order">
        <button className="flex justify-end float-end">
          Checkout
          <div className={`ml-1${btnPulse ? scaledBtn : ''}`}>🍔</div>
          <span className="flex">{countItems(cartItems)}</span>
        </button>
      </Link>
    </>
  );
}
