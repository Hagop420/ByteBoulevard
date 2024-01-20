// FILE IMPORT'S
import { ChangeEvent } from 'react';
import { FoodMenu } from '../lib/api';
import { Link } from 'react-router-dom';
import '../css/tailwind_linking.css';
import '../css/in_n_out_wall.css';
import '../css/searchGlass.css';

type Food = {
  currFood: FoodMenu[];
};

export function FoodAndMilkShakesMenu({ currFood }: Food) {
  return (
    <>
      <div className="flex justify-between">
        {currFood?.map((burgs, index) => (
          <div key={index}>
            <Link to={`product/${burgs.foodId}`}>
              <img src={burgs.imageUrl} alt={burgs.name} />
              <span className="bg-white text-black p-1 pr-1 pl-1 relative top-4">
                <span className="hover:bg-red-700 hover:p-1 hover:pl-1 hover:cursor-pointer">
                  ➖
                </span>{' '}
                {burgs.name}{' '}
                <span className="hover:bg-teal-700 hover:p-1 hover:pl-1 hover:cursor-pointer">
                  ➕
                </span>
              </span>
            </Link>
          </div>
        ))}
        {/* {currFood.length === 0 && <p>No Matches!</p>} */}
      </div>
    </>
  );
}

type FriesProp = {
  currFries: FoodMenu[];
};

// fries map

export function LoadFriesItem({ currFries }: FriesProp) {
  return (
    <>
      <div className="flex justify-around m-10">
        {currFries?.map((fries, index) => (
          <div key={index} className="">
            <Link to={`product/${fries.foodId}`}>
              <img src={fries.imageUrl} alt={fries.name} />
              <span className="bg-white text-black p-1 pr-1 pl-1 relative top-4">
                <span className="hover:bg-red-700 hover:p-1 hover:pl-1 hover:cursor-pointer">
                  ➖
                </span>{' '}
                {fries.name}{' '}
                <span className="hover:bg-teal-700 hover:p-1 hover:pl-1 hover:cursor-pointer">
                  ➕
                </span>
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

// end fry

type ShakesProp = {
  currShakes: FoodMenu[];
};

export function LoadShakeMenuItems({ currShakes }: ShakesProp) {
  return (
    <>
      <div className="flex justify-between m-9">
        {currShakes?.map((shakes, index) => (
          <div key={index} className="">
            <Link to={`product/${shakes.foodId}`}>
              <img src={shakes.imageUrl} alt={shakes.name} />
              <span className="bg-white text-black p-1 pr-1 pl-1 relative top-4">
                <span className="hover:bg-red-700 hover:p-1 hover:pl-1 hover:cursor-pointer">
                  ➖
                </span>{' '}
                {shakes.name}{' '}
                <span className="hover:bg-teal-700 hover:p-1 hover:pl-1 hover:cursor-pointer">
                  ➕
                </span>
              </span>
            </Link>
          </div>
        ))}
        {/* {currShakes.length === 0 && <p>No Matches!</p>} */}
      </div>
    </>
  );
}

// filter input typescript prop

type InputSearchProp = {
  inputSearch: (index: ChangeEvent<HTMLInputElement>) => void;
};

export function FilteringMenuItemsInput({ inputSearch }: InputSearchProp) {
  return (
    <div className="flex m-5 md:m-8">
      <input
        onChange={inputSearch}
        className="search form-control placeholder:italic placeholder:text-slate-400 placeholder:relative placeholder:left-6 placeholder:text-red-700	inputTop"
        placeholder="Enter item..."
      />
    </div>
  );
}

export function NextPageButton() {
  return (
    <div className="flex justify-end m-5 md:m-8 ">
      <button className="hover:transition-background hover:duration-2000 ease-in-out bg-amber-300 hover:bg-gradient-to-r hover:from-yellow-500 hover:via-black-100 hover:to-yellow-500 text-black hover:text-black py-2 px-4 rounded-md">
        <span className="">Next page ➜</span>
      </button>

      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75 hover:animation-none"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
      </span>
    </div>
  );
}
