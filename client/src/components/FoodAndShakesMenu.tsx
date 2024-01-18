// FILE IMPORT'S
import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { FoodMenu } from '../lib/api';
import '../css/tailwind_linking.css'





export function FoodAndMilkShakesMenu(){
  const [currFood , setCurrFood] = useState<FoodMenu[]>()

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


return(
      <>
        <div className='flex justify-between'>
    {currFood?.map((burgs , index) => (
    <img key={index} src={burgs.imageUrl} alt={burgs.name}/>
    ))}
        </div>

      </>


)


}
