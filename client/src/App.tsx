import { FoodAndMilkShakesMenu , LoadFriesItem , LoadShakeMenuItems , FilteringMenuItemsInput } from './components/FoodAndShakesMenu';
import { Route, Routes } from 'react-router-dom';
import { useState , useEffect} from 'react';
import './css/App.css';
import { FoodMenu } from './lib/api';

export default function App() {

    const [currFood , setCurrFood] = useState<FoodMenu[]>([])


    // french fries state
    const [currFry , setCurrFry] = useState<FoodMenu[]>([])

    // shakes state
    const [currShakes , setCurrShakes] = useState<FoodMenu[]>([])

    const [error, setError] = useState<unknown>();



    // Filtering through my menu item's using state hook

    const [menuFilter , setMenuFilter] = useState<FoodMenu[]>([])


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


    // French Frie's effect

    useEffect(() => {
    async function loadShakeItems(){
      try{
        const friesMenuItems = await fetch('/api/Fries')
        if(!friesMenuItems.ok) throw new Error(`Fetch error: ${friesMenuItems.status}`)
        const friesItems = await friesMenuItems.json()
        setCurrFry(friesItems)
      }catch(err){
        setError(err)
      }
    }
    loadShakeItems()
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
  } , [])


  useEffect(() => {
      async function gettingBurgersAndShakesMenuItems(){
      try{
          const allBurgsAndShakesPulled = await fetch('/api/allMenuItems')
        if(!allBurgsAndShakesPulled.ok) throw new Error(`Fetch error ${allBurgsAndShakesPulled.status}`)
        const menuItemsMealsAndCreamyDelights = await allBurgsAndShakesPulled.json()
          setMenuFilter(menuItemsMealsAndCreamyDelights)
      }catch(err){
        setError(err)
      }
      }
      gettingBurgersAndShakesMenuItems()

  } , [])

  return (
    <>
     {/* <Routes>
        <Route index element={<FoodAndMilkShakesMenu />} />
      </Routes> */}
      <FilteringMenuItemsInput />



     <FoodAndMilkShakesMenu currFood={currFood} />
     <LoadFriesItem currFries={currFry} />
      <LoadShakeMenuItems currShakes={currShakes} />
    </>
  );
}
