import { useState, useEffect } from 'react';
import { fetchDrinks, type FoodMenu } from '../lib/api';
import { Link } from 'react-router-dom';
import '../css/test.css';
import '@fortawesome/fontawesome-free/css/all.css';

export function ChooseDrinks() {
  const [currDrinkItem, setCurrcurrDrinkItem] = useState<FoodMenu>();

  const [currSelectValue, setCurrSelectedValue] = useState<any>();

  const [currDrink, setCurrDrink] = useState<FoodMenu[]>();
  const [error, setError] = useState<unknown>();

  // navigating between drinks functionallity

  useEffect(() => {
    async function loadFoodMenuDetails() {
      try {
        const product = await fetchDrinks();
        setCurrDrink(product);
      } catch (err) {
        setError(err);
        // navigate('/not-found')
      }
    }
    loadFoodMenuDetails();
  }, []);

  // unknown error handling

  if (!currDrink || error)
    return (
      <div>
        Error Loading drinks:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );

  return (
    <>
      <Link to="/">
        <div className="flex relative bottom-20">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75 hover:animation-none"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
          </span>
          <button className="bg-zinc-300">↺ Previous Page</button>
        </div>
      </Link>
      {/* // CHOOSING DRINK'S SELECT FORM */}
      <select
        name="drinks"
        id="drinks"
        value={currSelectValue}
        defaultValue={'drinks_select'}
        onChange={(e) => setCurrSelectedValue(e.target.value)}
        className="select_field_styling rounded">
        <option value="drinks_select" disabled>
          Choose a drink
        </option>
        {currDrink.map((drinks, index) => (
          <option key={index} value={drinks.imageUrl}>
            {drinks.name}
          </option>
        ))}
      </select>
      {(
        <img
          src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
          className="rounded"
          alt=""
        />
      ) && (
        <div className="flex justify-around items-center m-2 h-30">
          <span className="transition duration-300 ease-in-out bg-blue-500 hover:bg-red-700 hover:cursor-pointer text-white font-bold py-4 px-6 rounded-full">
            ➖
          </span>{' '}
          <img src={currSelectValue} alt="" className="h-25" />
          <span className="transition duration-300 ease-in-out bg-blue-500 hover:bg-green-800 hover:cursor-pointer text-white font-bold py-4 px-6 rounded-full">
            ➕
          </span>
        </div>
      )}

      {/* {<img src={currSelectValue} alt="" /> ?? (
        <img
          src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
          className="rounded"
          alt=""
        />
      )} */}

      <div className="flex flex-end justify-end items-start">
        <button className="bg-white text-black">View Cart</button>

        {/* <img
          src="https://cdn-icons-png.flaticon.com/512/3514/3514491.png"
          width="350"
          height="350"
        /> */}
      </div>
      {/* {=== currDrink ? <img src = {}> : <img src = 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg' alt='drink_menu_placeholder.'>} */}
    </>
  );
}
