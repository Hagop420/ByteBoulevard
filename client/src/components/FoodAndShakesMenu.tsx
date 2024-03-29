// FILE IMPORT'S
import { ChangeEvent, useEffect } from 'react';
import { useState } from 'react';
import { FoodMenu } from '../lib/api';
import { Link, useNavigate } from 'react-router-dom';
import '../css/tailwind_linking.css';
import '../css/in_n_out_wall.css';
import '../css/searchGlass.css';
import { FaHome } from 'react-icons/fa';
import { useCart } from './useCart';

type Food = {
  currFood: FoodMenu[];
};

export function FoodAndMilkShakesMenu({ currFood }: Food) {
  const navigate = useNavigate();
  const { cartItems, addingItemsToCart, removingItemsFromCart } = useCart();

  async function handleAddingItemsToCart(currMenu: FoodMenu) {
    if (!localStorage.getItem('token')) {
      alert(
        `To purchase a ${currMenu.name} you must be signed in or continue as guest.`
      );
      navigate('/signUp');
      return;
    }
    if (!currMenu) throw new Error(`Current menu is undefined`);
    try {
      const addCartItems = await addingItemsToCart(currMenu.foodId);
      if (currMenu) {
        alert(`${currMenu.name} added to cart!`);
      }

      JSON.stringify(addCartItems);
    } catch (err) {
      alert(err);
    }
  }

  // IF THE USER IS NOT SIGNED IN GO BACK TO THE SIGN UP/IN page

  // function ifLoginJWTNaN(currJWT: FoodMenu) {
  //   if (!localStorage.getItem('token')) {
  //     alert(
  //       `To purchase ${currJWT.name} you must be signed in.`
  //     );
  //   }
  // }

  async function handleRemovingItemsFromCart(currMenu: FoodMenu) {
    // const navigate = useNavigate();

    if (!localStorage.getItem('token')) {
      alert(
        `To remove a ${currMenu.name} you must be signed in or continue as guest.`
      );
      navigate('/signUp');
      return;
    }
    if (!currMenu) throw new Error(`CurrDrinkItem is undefined`);
    if (!cartItems.find((item) => item.foodId === currMenu.foodId)) {
      alert(`${currMenu.name} is not in cart`);
      return;
    }
    try {
      const removeCartItems = await removingItemsFromCart(currMenu.foodId);

      if (currMenu) {
        alert(`${currMenu.name} Removed from cart`);
      }

      JSON.stringify(removeCartItems);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <div className="flex justify-between burgers">
        {currFood?.map((burgs, index) => (
          <div key={index}>
            <Link to={`/product/${burgs.foodId}`}>
              <img src={burgs.imageUrl} alt={burgs.name} />
            </Link>
            <span className="bg-white text-black p-1 pr-1 pl-1 relative top-4 burgerCart">
              <span
                onClick={() => handleRemovingItemsFromCart(burgs)}
                className="hover:bg-red-700 hover:p-1 hover:pl-1 hover:cursor-pointer active:opacity-95 active:bg-green-600">
                ➖
              </span>{' '}
              {burgs.name}{' '}
              <span
                onClick={() => handleAddingItemsToCart(burgs)}
                className="hover:bg-teal-700 hover:p-1 hover:pl-1 hover:cursor-pointer active:opacity-95 active:bg-green-600">
                ➕
              </span>
            </span>
          </div>
        ))}
        {currFood.length === 0 && (
          <p className="m-auto font-bold text-amber-900 text-2xl night	">
            No Burger's by that name!
          </p>
        )}
      </div>
    </>
  );
}

type FriesProp = {
  currFries: FoodMenu[];
};

// fries map

export function LoadFriesItem({ currFries }: FriesProp) {
  const navigate = useNavigate();
  // add to cart

  const { cartItems, addingItemsToCart, removingItemsFromCart } = useCart();

  async function handleAddingItemsToCart(currMenu: FoodMenu) {
    if (!localStorage.getItem('token')) {
      alert(
        `To purchase your order of 1 ${currMenu.name} you must be signed in or continue as guest.`
      );
      navigate('/signUp');
      return;
    }
    if (!currMenu) throw new Error(`Current menu is undefined`);

    try {
      const addCartItems = await addingItemsToCart(currMenu.foodId);
      if (currMenu) {
        alert(`${currMenu.name} added to cart`);
      }
      JSON.stringify(addCartItems);
    } catch (err) {
      alert(err);
    }
  }

  async function handleRemovingItemsFromCart(currMenu: FoodMenu) {
    if (!localStorage.getItem('token')) {
      alert(
        `To remove your order of 1 ${currMenu.name} you must be signed in or continue as guest.`
      );
      navigate('/signUp');
      return;
    }
    if (!currMenu) throw new Error(`CurrDrinkItem is undefined`);
    if (!cartItems.find((item) => item.foodId === currMenu.foodId)) {
      alert(`${currMenu.name} is not in cart`);
      return;
    }
    try {
      const removeCartItems = await removingItemsFromCart(currMenu.foodId);
      if (currMenu) {
        alert(`${currMenu.name} removed from cart`);
      }
      JSON.stringify(removeCartItems);
    } catch (err) {
      alert(err);
    }
  }
  // cart end
  return (
    <>
      <div className="flex justify-around m-10 fries">
        {currFries?.map((fries, index) => (
          <div key={index} className="">
            <Link to={`/product/${fries.foodId}`}>
              <img src={fries.imageUrl} alt={fries.name} />
            </Link>
            <span className="bg-white text-black p-1 pr-1 pl-1 relative top-4 friesCart">
              <span
                className="hover:bg-red-700 hover:p-1 hover:pl-1 hover:cursor-pointer active:opacity-95 active:bg-red-600"
                onClick={() => handleRemovingItemsFromCart(fries)}>
                ➖
              </span>{' '}
              {fries.name}{' '}
              <span
                className="hover:bg-teal-700 hover:p-1 hover:pl-1 hover:cursor-pointer active:opacity-95 active:bg-green-600"
                onClick={() => handleAddingItemsToCart(fries)}>
                ➕
              </span>
            </span>
          </div>
        ))}
        {currFries.length === 0 && (
          <p className="m-auto font-bold text-zinc-900 text-2xl	night">
            No French fries by that name!
          </p>
        )}
      </div>
    </>
  );
}

// end fry

type ShakesProp = {
  currShakes: FoodMenu[];
};

export function LoadShakeMenuItems({ currShakes }: ShakesProp) {
  // add to cart
  const navigate = useNavigate();

  const { cartItems, addingItemsToCart, removingItemsFromCart } = useCart();

  async function handleAddingItemsToCart(currMenu: FoodMenu) {
    if (!localStorage.getItem('token')) {
      alert(
        `To purchase a ${currMenu.name} you must be signed in or continue as guest.`
      );
      navigate('/signUp');
      return;
    }

    if (!currMenu) throw new Error(`Current menu is undefined`);

    try {
      const addCartItems = await addingItemsToCart(currMenu.foodId);

      if (currMenu) {
        alert(`${currMenu.name} added to cart`);
      }

      JSON.stringify(addCartItems);
    } catch (err) {
      alert(err);
    }
  }

  async function handleRemovingItemsFromCart(currMenu: FoodMenu) {
    if (!localStorage.getItem('token')) {
      alert(
        `To remove a ${currMenu.name} you must be signed in or continue as guest.`
      );
      navigate('/signUp');
      return;
    }
    if (!currMenu) throw new Error(`CurrDrinkItem is undefined`);
    if (!cartItems.find((item) => item.foodId === currMenu.foodId)) {
      alert(`${currMenu.name} is not in cart`);
      return;
    }
    try {
      const removeCartItems = await removingItemsFromCart(currMenu.foodId);
      if (currMenu) {
        alert(`${currMenu.name} removed from cart`);
      }
      JSON.stringify(removeCartItems);
    } catch (err) {
      alert(err);
    }
  }
  // cart end
  return (
    <>
      <div className="flex justify-between m-9 shakes">
        {currShakes?.map((shakes, index) => (
          <div key={index} className="">
            <Link to={`/product/${shakes.foodId}`}>
              <img src={shakes.imageUrl} alt={shakes.name} />
            </Link>
            <span className="bg-white text-black p-1 pr-1 pl-1 relative top-4 shakesCart">
              <span
                className="hover:bg-red-700 hover:p-1 hover:pl-1 hover:cursor-pointer active:opacity-95 active:bg-red-600"
                onClick={() => handleRemovingItemsFromCart(shakes)}>
                ➖
              </span>{' '}
              {shakes.name}{' '}
              <span
                className="hover:bg-teal-700 hover:p-1 hover:pl-1 hover:cursor-pointer active:opacity-95 active:bg-green-600"
                onClick={() => handleAddingItemsToCart(shakes)}>
                ➕
              </span>
            </span>
          </div>
        ))}
        {currShakes.length === 0 && (
          <p className="m-auto font-bold text-2xl	night text-slate-700">
            No Milkshake's by that name!
          </p>
        )}
      </div>
    </>
  );
}

// filter input typescript prop

type InputSearchProp = {
  inputSearch: (index: ChangeEvent<HTMLInputElement>) => void;
};

export function FilteringMenuItemsInput({ inputSearch }: InputSearchProp) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'retro');

  function handleToggle(e) {
    if (e.target.checked) {
      setTheme('night');
    } else {
      setTheme('retro'); //light
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme') ?? 'retro';
    document.querySelector('html')?.setAttribute('data-theme', localTheme);
  }, [theme]);

  return (
    <>
      {/* Light and dark mode component rendering */}
      <div className="flex relative bottom-8 justify-between items-start">
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

      {/* HOME PAGE */}
      <Link to="/">
        <div className="flex text-black justify-start float-right text-4xl hover:text-zinc-800 HME">
          <FaHome />
        </div>
      </Link>
      {/* END HOME */}

      <div className="flex m-5 md:m-8">
        <input
          onChange={inputSearch}
          className="search form-control placeholder:italic placeholder:text-green-800-400 placeholder:relative placeholder:left-6 placeholder:text-black	inputTop"
          placeholder="Enter item..."
        />
      </div>
    </>
  );
}

export function NextPageButton() {
  return (
    <div className="flex justify-end m-5 md:m-8 ">
      <Link to="/drinks">
        <button className="hover:transition-background btn hover:duration-2000 ease-in-out bg-amber-300 hover:bg-gradient-to-r hover:from-yellow-500 hover:via-black-100 hover:to-yellow-500 text-black hover:text-black py-2 px-4 rounded-md btn">
          <span className="DMBL">Next page ➜</span>
        </button>
      </Link>

      <span className="relative flex h-3 w-3 WHITE_ANIM">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black WHITE_ANIM opacity-75 hover:animation-none"></span>
        <span className="relative WHITE_ANIM inline-flex rounded-full h-3 w-3 bg-black"></span>
      </span>
    </div>
  );
}
