import { FoodAndMilkShakesMenu , LoadShakeMenuItems , FilteringMenuItemsInput } from './components/FoodAndShakesMenu';
import { Route, Routes } from 'react-router-dom';
import { useState , useEffect} from 'react';
import './css/App.css';
import { FoodMenu } from './lib/api';

export default function App() {

    const [currFood , setCurrFood] = useState<FoodMenu[]>([])




    // shakes state
    const [currShakes , setCurrShakes] = useState<FoodMenu[]>([])

    const [error, setError] = useState<unknown>();


    useEffect(() => {
    async function loadFoodMenuItems(){
      try{
        const burgerMenuItems = await fetch('/api/Food')
        if (!burgerMenuItems.ok) throw new Error(`Fetch Error: ${burgerMenuItems.status}`);
        const menuFoodItems = await burgerMenuItems.json()

        setCurrFood(menuFoodItems)
      }catch(err){
        setError(err)
      }
    }
    loadFoodMenuItems()

  } , [])


  // shakes effect

    useEffect(() => {
    async function loadShakeItems(){
      try{
        const shakeMenuItems = await fetch('/api/Shakes')
        if(!shakeMenuItems.ok) throw new Error(`Fetch error: ${shakeMenuItems.status}`)
        const menuShakeItems = await shakeMenuItems.json()
        setCurrShakes(menuShakeItems)
      }catch(err){
        setError(err)
      }
    }
    loadShakeItems()
  })

  return (
    <>
     {/* <Routes>
        <Route index element={<FoodAndMilkShakesMenu />} />
     </Routes> */}
     <FilteringMenuItemsInput />
     <FoodAndMilkShakesMenu currFood={currFood} />
        <LoadShakeMenuItems currShakes={currShakes} />
    </>
  );
}
