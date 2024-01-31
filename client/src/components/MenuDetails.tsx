// FILE IMPORT'S
import { useEffect, useState } from 'react';
import { foodMenuItemsId, type FoodMenu } from '../lib/api';
import { toDollars } from '../lib/toDollars';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../css/menuDetails.css';
import '@fortawesome/fontawesome-free/css/all.css';

export function MenuDetails() {
  // TODO: Retrieve foodId from the route
  const { foodId } = useParams();
  const navigate = useNavigate();
  const [currMenuItem, setCurrMenuItem] = useState<FoodMenu>();
  // temporarily trying out the loading state
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<unknown>();

  // FUNCTIONALLITY FOR LIGHT AND DARK MODE
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

  // LIGHT/DARK MODE END

  // menu startingRenderEffect
  useEffect(() => {
    async function loadFoodMenuDetails(foodId: number) {
      try {
        const product = await foodMenuItemsId(foodId);
        setCurrMenuItem(product);
      } catch (err) {
        setError(err);
        navigate('/not-found');
      } finally {
        setIsLoading(false);
      }
    }
    if (foodId) {
      setIsLoading(true);
      loadFoodMenuDetails(+foodId);
    }
  }, [foodId, navigate]);

  if (isLoading) {
    return (
      <div className="w-16 h-16">
        <i className="fas fa-circle text-blue-500 text-3xl animate-spin"></i>
        <p>Loading...</p>
      </div>
    );
  }
  if (!currMenuItem || error)
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

  const { name, description, imageUrl, background, notice, price, category } =
    currMenuItem;

  const bkg = background;
  return (
    <>
      {/* Light and dark mode component rendering */}
      <div className="flex relative bottom-8 justify-between items-start sunMoon_responsive">
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

      <div
        className="flex flex-col justify-start md:p-20 mobile_details container"
        style={{
          backgroundImage: bkg,
          background: `${bkg}`,
          padding: '100px',
          objectFit: 'cover',
          borderRadius: '50%',
        }}>
        <img
          src={imageUrl}
          alt=""
          className=" h-32 object-contain transition-transform hover:scale-125"
        />
        <div className="flex justify-end">
          <h2 className="text-2xl -rotate-45">{category}</h2>
        </div>
        <div className="m-9">
          <h2 className="text-4xl m-5">{name}</h2>
          <p>{description}</p>
          <p className="font-bold m-3 text-lg">{notice}</p>
          <span className="m-9">
            <p>{toDollars(price)}</p>
          </span>
        </div>
        <Link to="/menu" className="m-auto md:flex md:relative md:float-left">
          <button className="font-bold text-white bg-black rounded-md transition-transform transform hover:scale-105 hover:bg-amber-600 focus:outline-none focus:shadow-outline-blue active:bg-slate-300">
            ↻ Back to Menu
          </button>
        </Link>
      </div>
    </>
  );
}
