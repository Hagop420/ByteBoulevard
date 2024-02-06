import { useState, useEffect, ChangeEvent, createContext } from 'react';
import { fetchDrinks, type FoodMenu } from '../lib/api';
import { Link, useNavigate } from 'react-router-dom';
import '../css/test.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useCart } from './useCart';
import { countItems } from '../lib/toDollars';

// CONTEXT

export const Context = createContext({
  quantity: 0,
  // setQuantity: (): number => 0,
});

export function ChooseDrinks() {
  const { cartItems, addingItemsToCart, removingItemsFromCart } = useCart();

  const [currDrinkItem, setCurrDrinkItem] = useState<FoodMenu>();

  // const [currSelectValue, setCurrSelectedValue] = useState<any>();

  // THEME STATE
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'retro');

  const [currDrink, setCurrDrink] = useState<FoodMenu[]>();
  const [error, setError] = useState<unknown>();

  const navigate = useNavigate();

  // navigating between drinks functionallity

  // THEME from daisyUI

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

  useEffect(() => {
    async function loadFoodMenuDetails() {
      try {
        const product = await fetchDrinks();
        setCurrDrink(product);
      } catch (err) {
        setError(err);
        navigate('/not-found');
      }
    }
    loadFoodMenuDetails();
  }, [navigate]);

  function handleSelection(e: ChangeEvent<HTMLSelectElement>) {
    const namesOfDrink = currDrink?.find(
      (item) => item.foodId === +e.target.value
    );
    setCurrDrinkItem(namesOfDrink);
  }

  async function handleAddingItemsToCart() {
    if (!localStorage.getItem('token')) {
      alert(
        `To purchase a ${currDrinkItem?.name} you must be signed in or continue as guest.`
      );
      navigate('/signUp');
      return;
    }
    if (!currDrinkItem) throw new Error(`CurrDrinkItem is undefined`);
    try {
      const addCartItems = await addingItemsToCart(currDrinkItem.foodId);

      JSON.stringify(addCartItems);
    } catch (err) {
      alert(err);
    }
  }

  async function handleRemovingItemsFromCart() {
    if (!localStorage.getItem('token')) {
      alert(
        `To remove a ${currDrinkItem?.name} you must be signed in or continue as guest.`
      );
      navigate('/signUp');
      return;
    }
    if (!currDrinkItem) throw new Error(`CurrDrinkItem is undefined`);
    if (!cartItems.find((item) => item.foodId === currDrinkItem?.foodId)) {
      alert(`${currDrinkItem?.name} is not in cart`);
      return;
    }
    try {
      const removeCartItems = await removingItemsFromCart(currDrinkItem.foodId);

      JSON.stringify(removeCartItems);
    } catch (err) {
      alert(err);
    }
  }

  // unknown error handling

  if (!currDrink || error)
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

        <div className="text-5xl TEXT_BACKGROUND">
          Error Loading drinks:{' '}
          {error instanceof Error ? error.message : 'Unknown Error'}
          <img
            src="https://emojis.slackmojis.com/emojis/images/1692802704/67622/404.gif?1692802704"
            alt="Response_404"
            className="m-10 mx-auto h-50 rounded"
          />
        </div>
      </>
    );

  // LIGHT/DARK MODE

  const { foodId, name, imageUrl, background } = currDrinkItem ?? {};
  const bkg = background;

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

      <Link to="/menu">
        <div className="flex justify-start centered_functionallity_router">
          <span className="relative flex h-3 w-3 mobile_hide">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full DRYL bg-black opacity-75 hover:animation-none"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-black DRYL"></span>
          </span>
          <button className="font-bold DARK">↺ Previous Page</button>
        </div>
      </Link>
      {/* // CHOOSING DRINK'S SELECT FORM */}
      <select
        name="drinks"
        id="drinks"
        value={foodId}
        defaultValue={'drinks_select'}
        onChange={handleSelection}
        className="select_field_styling rounded mt-20">
        <option value="drinks_select" disabled>
          Choose a drink
        </option>
        {currDrink.map((drinks, index) => (
          <option key={index} value={drinks.foodId}>
            {drinks.name}
          </option>
        ))}
      </select>

      {currDrinkItem ? (
        <div className="flex justify-around items-center m-2 h-30 mobile_drinks_section">
          <span
            onClick={handleRemovingItemsFromCart}
            className="transition duration-300 ease-in-out bg-blue-500 hover:bg-red-700 hover:cursor-pointer text-white font-bold py-4 px-6 rounded-full">
            ➖
          </span>{' '}
          <div className="img_mobile">
            <img
              style={{ background: bkg, borderRadius: '10px', margin: '20px' }}
              src={imageUrl}
              alt=""
              className="h-25"
            />
            <p style={{ color: bkg, fontSize: '40px' }}>{name}</p>
          </div>
          <span
            onClick={handleAddingItemsToCart}
            className="transition duration-300 ease-in-out bg-blue-500 hover:bg-green-400 hover:cursor-pointer text-white font-bold py-4 px-6 rounded-full">
            ➕
          </span>
        </div>
      ) : (
        <img
          src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
          className="rounded"
          alt=""
        />
      )}

      <Link to="/order_conformation">
        <div className="flex flex-end justify-end mt-20 items-center">
          <button className="bg-black BTN_NIGHT text-black WH">
            View Cart
            <span className="relative bottom-1">🛒</span>
            <div className="bg-black relative top-1 right-1 rad flex m-auto justify-center items-center float-end text-white text-center">
              {countItems(cartItems)}
            </div>
          </button>
        </div>
      </Link>
    </>
  );
}
