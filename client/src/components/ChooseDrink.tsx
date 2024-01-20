import { FoodMenu } from '../lib/api';
import { Link } from 'react-router-dom';

export function ChooseDrinks() {
  return (
    <Link to="/" className="relative bottom-80 right-40">
      <div className="flex">
        <button className="bg-white">↺ Previous Page</button>
      </div>
    </Link>
  );
}
