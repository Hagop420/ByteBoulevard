import { createContext } from 'react';
import { FoodMenu } from '../lib/api';

type CartContextValues = {
  cartItems: FoodMenu[];
  addingItemsToCart: () => Promise<void>;
  removingItemsFromCart: () => Promise<void>;
};

export const CartContext = createContext<CartContextValues>({
  cartItems: [],
  addingItemsToCart: () => Promise.reject(),
  removingItemsFromCart: () => Promise.reject(),
});

export const CartProvider = CartContext.Provider;
