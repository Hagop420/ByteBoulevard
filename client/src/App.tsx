import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import { IntroScreen } from './components/IntroScreen';
import { MenuPageWrap } from './components/MenuPageWrap';
import { MenuDetails } from './components/MenuDetails';
import { ChooseDrinks } from './components/ChooseDrink';
import { OrderConfirmation } from './components/Order_confirmation';
import { SignUpForm } from './components/SignUp';
import { SignInForm } from './components/SignIn';
import {
  fetchAddToCart,
  fetchRemoveFromCart,
  fetchCartItems,
  type FoodMenu,
  CartItem,
} from './lib/api';
import { CartProvider } from './components/CartProvider';
import { NotFoundPage } from './components/NotFoundPage';

const tokenKey = 'react-context-jwt';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  async function addingItemsToCart(foodId: number) {
    const addItemToCartFetched = await fetchAddToCart(foodId);
    setCartItems(addItemToCartFetched);
  }

  async function removingItemsFromCart(foodId: number) {
    const removeItemFromCartFetched = await fetchRemoveFromCart(foodId);
    setCartItems(removeItemFromCartFetched);
  }

  useEffect(() => {
    async function getCart() {
      try {
        const cartItems = await fetchCartItems();
        setCartItems(cartItems);
      } catch (err) {
        console.log(err);
      }
    }
    getCart();
  }, []);

  const cartContext = {
    cartItems,
    addingItemsToCart,
    removingItemsFromCart,
  };

  return (
    <CartProvider value={cartContext}>
      <Routes>
        <Route index element={<IntroScreen />} />
        <Route path="/menu" element={<MenuPageWrap />} />
        <Route path="signIn/" element={<SignInForm />} />
        <Route path="signUp/" element={<SignUpForm />} />
        <Route path="product/:foodId" element={<MenuDetails />} />
        <Route path="drinks/" element={<ChooseDrinks />} />
        <Route path="order_conformation/" element={<OrderConfirmation />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </CartProvider>
  );
}
