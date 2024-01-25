import { createContext } from 'react';
import { CartItem, FoodMenu } from '../lib/api';

type CartContextValues = {
  cartItems: CartItem[];
  btnPulse: boolean;
  addingItemsToCart: (foodId: number) => Promise<void>;
  removingItemsFromCart: (foodId: number) => Promise<void>;
  removeItemCompletely: (foodId: number) => Promise<void>;
};

export const CartContext = createContext<CartContextValues>({
  cartItems: [],
  addingItemsToCart: () => Promise.reject(),
  removingItemsFromCart: () => Promise.reject(),
  removeItemCompletely: () => Promise.reject(),
  btnPulse: false,
});

export const CartProvider = CartContext.Provider;
