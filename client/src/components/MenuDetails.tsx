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

  // menu startingRenderEffect
  useEffect(() => {
    async function loadFoodMenuDetails(foodId: number) {
      try {
        const product = await foodMenuItemsId(foodId);
        setCurrMenuItem(product);
      } catch (err) {
        setError(err);
        // navigate('/not-found')
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
      <div
        className="flex flex-col justify-start md:p-20"
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
        <Link to="/" className="m-auto md:flex md:relative md:float-left">
          <button className="font-bold text-white bg-black rounded-md transition-transform transform hover:scale-105 hover:bg-amber-600 focus:outline-none focus:shadow-outline-blue active:bg-slate-300">
            ↻ Back to Menu
          </button>
        </Link>
      </div>
    </>
  );
}
