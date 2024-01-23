export type FoodMenu = {
  foodId: number;
  name: string;
  description: string;
  background: string;
  notice: string;
  imageUrl: string;
  price: number;
  category: string;
};

//  IMPORTANT FOR CONFIRMATION PAGE
export async function fetchFoodMenuItems(): Promise<FoodMenu[]> {
  const res = await fetch('/api/Food');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
//

// end sign up AC

export async function fetchShakeMenuItems(): Promise<FoodMenu[]> {
  const res = await fetch('/api/Shakes');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

// food menu individual ids

export async function foodMenuItemsId(foodId: number): Promise<FoodMenu> {
  const res = await fetch(`/api/Food/${foodId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

// Getting the drinks

export async function fetchDrinksId(drinkId: number): Promise<FoodMenu> {
  const res = await fetch(`/api/SoftDrinks${drinkId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
export async function fetchDrinks(): Promise<FoodMenu[]> {
  const res = await fetch('/api/SoftDrinks');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
