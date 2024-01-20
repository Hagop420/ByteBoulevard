// FILE IMPORT'S
import { useEffect, useState } from 'react';
import { foodMenuItemsId, type FoodMenu } from '../lib/api';
import { toDollars } from '../lib/toDollars';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../css/menuDetails.css';

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
    return <div>Loading...</div>;
  }
  if (!currMenuItem || error)
    return (
      <div>
        Error Loading Catalog:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );

  const { name, description, imageUrl, background, price, category } =
    currMenuItem;

  const bkg = background;
  return (
    <>
      <div
        className="flex flex-col justify-start wrapped"
        style={{ backgroundImage: `url(${bkg})` }}>
        <img
          src={imageUrl}
          alt=""
          className=" h-20 object-contain transition-transform transform hover:scale-125"
        />
        <div className="m-9">
          <h2 className="text-4xl m-5">{name}</h2>
          <p>Describtion: {description}</p>
          <span className="m-9">
            <p>{toDollars(price)}</p>
          </span>
        </div>
        <Link to="/" className="flex m-10">
          <div>
            <button>Back to menu</button>
          </div>
        </Link>
      </div>
      <h2 className="text-6xl -rotate-45 relative right-0">{category}</h2>
    </>
  );
}
