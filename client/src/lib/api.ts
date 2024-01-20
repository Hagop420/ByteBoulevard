export type FoodMenu = {
  foodId: number;
  name: string;
  description: string;
  background: string;
  imageUrl: string;
  price: number;
  category: string;
};

export async function fetchFoodMenuItems(): Promise<FoodMenu[]> {
  const res = await fetch('/api/Food');
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

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
