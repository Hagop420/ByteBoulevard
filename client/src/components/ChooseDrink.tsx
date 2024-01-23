import { useState, useEffect, ChangeEvent, createContext } from 'react';
import { fetchDrinks, foodMenuItemsId, type FoodMenu } from '../lib/api';
import { Link } from 'react-router-dom';
import '../css/test.css';
import '@fortawesome/fontawesome-free/css/all.css';

// CONTEXT

export const Context = createContext({
  quantity: 0,
  // setQuantity: (): number => 0,
});

export function ChooseDrinks() {
  const [currDrinkItem, setCurrDrinkItem] = useState<FoodMenu>();

  // const [currSelectValue, setCurrSelectedValue] = useState<any>();

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

  function handleSelection(e: ChangeEvent<HTMLSelectElement>) {
    const namesOfDrink = currDrink?.find(
      (item) => item.foodId === +e.target.value
    );
    setCurrDrinkItem(namesOfDrink);
  }

  // unknown error handling

  if (!currDrink || error)
    return (
      <div>
        Error Loading drinks:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
        <img
          src="https://emojis.slackmojis.com/emojis/images/1692802704/67622/404.gif?1692802704"
          alt="Response_404"
          className="m-10 mx-auto h-50 rounded"
        />
      </div>
    );

  const {
    foodId,
    name,
    description,
    imageUrl,
    background,
    notice,
    price,
    category,
  } = currDrinkItem ?? {};
  const bkg = background;
  const clr = bkg;

  return (
    <>
      <Link to="/">
        <div className="flex justify-start">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75 hover:animation-none"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
          </span>
          <button className="bg-zinc-300 DARK">↺ Previous Page</button>
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
        <div className="flex justify-around items-center m-2 h-30">
          <span className="transition duration-300 ease-in-out bg-blue-500 hover:bg-red-700 hover:cursor-pointer text-white font-bold py-4 px-6 rounded-full">
            ➖
          </span>{' '}
          <div>
            <img
              style={{ background: bkg, borderRadius: '10px', margin: '20px' }}
              src={imageUrl}
              alt=""
              className="h-25"
            />
            <p style={{ color: bkg, fontSize: '40px' }}>{name}</p>
          </div>
          <span className="transition duration-300 ease-in-out bg-blue-500 hover:bg-green-400 hover:cursor-pointer text-white font-bold py-4 px-6 rounded-full">
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
        <div className="flex flex-end justify-end mt-20 items-start">
          <button className="bg-white text-black">
            View Cart
            <span className="relative bottom-1">🛒</span>
            <div className="bg-black relative top-1 right-1 rad flex m-auto justify-center float-end text-white text-center">
              0
            </div>
          </button>
        </div>
      </Link>
    </>
  );
}
