
export type FoodMenu = {
  foodId: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string
}


export async function fetchFoodMenuItems(): Promise<FoodMenu[]>{
  const res = await fetch('/api/Food');
  if(!res.ok)throw new Error(`fetch Error ${res.status}`);
  return await res.json()
}
