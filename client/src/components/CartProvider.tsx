import { createContext } from 'react';
import { CartItem, FoodMenu } from '../lib/api';

type CartContextValues = {
  cartItems: CartItem[];
  addingItemsToCart: (foodId: number) => Promise<void>;
  removingItemsFromCart: (foodId: number) => Promise<void>;
};

export const CartContext = createContext<CartContextValues>({
  cartItems: [],
  addingItemsToCart: () => Promise.reject(),
  removingItemsFromCart: () => Promise.reject(),
});

export const CartProvider = CartContext.Provider;
