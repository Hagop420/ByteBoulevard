import { useEffect, useState } from 'react';
import {
  FoodAndMilkShakesMenu,
  LoadFriesItem,
  LoadShakeMenuItems,
  FilteringMenuItemsInput,
  NextPageButton,
} from './FoodAndShakesMenu';
import '../css/in_n_out_wall.css';
import { FoodMenu } from '../lib/api';

export function MenuPageWrap() {
  const [currFood, setCurrFood] = useState<FoodMenu[]>([]);

  // french fries state
  const [currFry, setCurrFry] = useState<FoodMenu[]>([]);

  // shakes state
  const [currShakes, setCurrShakes] = useState<FoodMenu[]>([]);

  // input state
  const [currInput, setCurrInput] = useState('');

  const matchedFood = currFood.filter((burgers) =>
    burgers.name.toLocaleLowerCase().includes(currInput.toLocaleLowerCase())
  );
  const matchedSides = currFry.filter((fries) =>
    fries.name.toLocaleLowerCase().includes(currInput.toLocaleLowerCase())
  );
  const matchedShake = currShakes.filter((shakes) =>
    shakes.name.toLocaleLowerCase().includes(currInput.toLocaleLowerCase())
  );
  useEffect(() => {
    async function loadFoodMenuItems() {
      try {
        const burgerMenuItems = await fetch('/api/Food');
        if (!burgerMenuItems.ok)
          throw new Error(`Fetch Error: ${burgerMenuItems.status}`);
        const menuFoodItems = await burgerMenuItems.json();

        setCurrFood(menuFoodItems);
      } catch (err) {
        alert(err);
      }
    }
    loadFoodMenuItems();
  }, []);

  // French Frie's effect

  useEffect(() => {
    async function loadShakeItems() {
      try {
        const friesMenuItems = await fetch('/api/Fries');
        if (!friesMenuItems.ok)
          throw new Error(`Fetch error: ${friesMenuItems.status}`);
        const friesItems = await friesMenuItems.json();
        setCurrFry(friesItems);
      } catch (err) {
        alert(err);
      }
    }
    loadShakeItems();
  }, []);

  // shakes effect

  useEffect(() => {
    async function loadShakeItems() {
      try {
        const shakeMenuItems = await fetch('/api/Shakes');
        if (!shakeMenuItems.ok)
          throw new Error(`Fetch error: ${shakeMenuItems.status}`);
        const menuShakeItems = await shakeMenuItems.json();
        setCurrShakes(menuShakeItems);
      } catch (err) {
        alert(err);
      }
    }
    loadShakeItems();
  }, []);

  return (
    <div>
      <NextPageButton />
      <FilteringMenuItemsInput
        inputSearch={(e) => setCurrInput(e.target.value)}
      />

      <FoodAndMilkShakesMenu currFood={matchedFood} />
      <LoadFriesItem currFries={matchedSides} />
      <LoadShakeMenuItems currShakes={matchedShake} />
    </div>
  );
}
