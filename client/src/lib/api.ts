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

export type User = {
  userId: number;
  username: string;
};
export type Auth = {
  user: User;
  token: string;
};

export type CartItem = FoodMenu & {
  userId: number;
  foodId: number;
  quantity: number;
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

// ADDING TO CART FUNCTIONALLITY

export async function fetchCartItems(): Promise<CartItem[]> {
  const fetchingCartItems = await fetch('/api/Carts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!fetchingCartItems.ok) {
    throw new Error(`Cannot find CartItems: ${fetchingCartItems.status}`);
  }
  const awaitedCartData = await fetchingCartItems.json();
  return awaitedCartData;
}

export async function fetchAddToCart(foodId: number) {
  const addItemToCartFetched = await fetch('/api/Carts/add', {
    method: 'POST',
    body: JSON.stringify({ foodId: foodId }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!addItemToCartFetched.ok) {
    throw new Error(`Cannot remove CartItems: ${addItemToCartFetched.status}`);
  }

  const awaitedCartData = await addItemToCartFetched.json();
  return awaitedCartData;
}

export async function fetchRemoveFromCart(foodId: number) {
  const removeItemFromCartFetched = await fetch('/api/Carts/remove', {
    method: 'DELETE',
    body: JSON.stringify({ foodId: foodId }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!removeItemFromCartFetched.ok) {
    throw new Error(
      `Cannot remove CartItems: ${removeItemFromCartFetched.status}`
    );
  }
  const awaitedCartData = await removeItemFromCartFetched.json();
  return awaitedCartData;
}

// REMOVING THE ENTIRE IMAGE FROM CART IF THE REMOVE BUTTON IS CLICKED

export async function fetchRemoveEntireImgFormCart(foodId: number) {
  const removeItemFromCartFetched = await fetch('/api/Carts/removeCartImage', {
    method: 'DELETE',
    body: JSON.stringify({ foodId: foodId }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!removeItemFromCartFetched.ok) {
    throw new Error(
      `Cannot remove CartItems: ${removeItemFromCartFetched.status}`
    );
  }
  const awaitedCartData = await removeItemFromCartFetched.json();
  return awaitedCartData;
}
