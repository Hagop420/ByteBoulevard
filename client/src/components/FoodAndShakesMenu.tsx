// FILE IMPORT'S
import { FoodMenu } from '../lib/api';
import '../css/tailwind_linking.css'
import '../css/in_n_out_wall.css'
import '../css/searchGlass.css'


type Food ={
  currFood: FoodMenu[]
}


export function FoodAndMilkShakesMenu({currFood}: Food){












return(
      <>
        <div className='flex justify-between'>

    {currFood?.map((burgs , index) => (

      <div key={index}  className='mt-20'>
    <img src={burgs.imageUrl} alt={burgs.name}/>
          <span>{burgs.name}</span>
        </div>
    ))}
        </div>



      </>


)


}

type ShakesProp = {
    currShakes: FoodMenu[]
}


export function LoadShakeMenuItems({currShakes}: ShakesProp){


  return(
    <>

            <div className='flex justify-between'>

    {currShakes?.map((shakes , index) => (

      <div key={index} className=''>
    <img src={shakes.imageUrl} alt={shakes.name}/>
          <span>{shakes.name}</span>
        </div>
    ))}
        </div>


      </>


)

}



export function FilteringMenuItemsInput(){
  return(
    <input type="text" className='search' />
  )
}
