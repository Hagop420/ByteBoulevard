import React, { useEffect, useState } from 'react';
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

  const [error, setError] = useState<unknown>();

  const [currInput, setCurrInput] = useState('');

  // Filtering through my menu item's using state hook

  const [menuFilter, setMenuFilter] = useState<FoodMenu[]>([]);

  const matchedFood = currFood.filter((l) =>
    l.name.toLocaleLowerCase().includes(currInput.toLocaleLowerCase())
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
        setError(err);
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
        setError(err);
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
        setError(err);
      }
    }
    loadShakeItems();
  }, []);

  useEffect(() => {
    async function gettingBurgersAndShakesMenuItems() {
      try {
        const allBurgsAndShakesPulled = await fetch('/api/allMenuItems');
        if (!allBurgsAndShakesPulled.ok)
          throw new Error(`Fetch error ${allBurgsAndShakesPulled.status}`);
        const menuItemsMealsAndCreamyDelights =
          await allBurgsAndShakesPulled.json();
        setMenuFilter(menuItemsMealsAndCreamyDelights);
      } catch (err) {
        setError(err);
      }
    }
    gettingBurgersAndShakesMenuItems();
  }, []);
  return (
    <div>
      <NextPageButton />
      <FilteringMenuItemsInput
        inputSearch={(e) => setCurrInput(e.target.value)}
      />

      <FoodAndMilkShakesMenu currFood={matchedFood} />
      <LoadFriesItem currFries={currFry} />
      <LoadShakeMenuItems currShakes={currShakes} />
    </div>
  );
}
