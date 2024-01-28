import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import { IntroScreen } from './components/IntroScreen';
import { MenuPageWrap } from './components/MenuPageWrap';
import { MenuDetails } from './components/MenuDetails';
import { ChooseDrinks } from './components/ChooseDrink';
import { OrderConfirmation } from './components/Order_confirmation';
import { ThankYouForYourOrder } from './components/Thank_you_for_your_order';
import { SignUpForm } from './components/SignUp';
import { SignInForm } from './components/SignIn';
import {
  fetchAddToCart,
  fetchRemoveFromCart,
  fetchCartItems,
  CartItem,
  fetchRemoveEntireImgFormCart,
} from './lib/api';
import { CartProvider } from './components/CartProvider';
import { NotFoundPage } from './components/NotFoundPage';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [btnPulse, setBtnPulse] = useState(false);

  async function addingItemsToCart(foodId: number) {
    const addItemToCartFetched = await fetchAddToCart(foodId);
    setCartItems(addItemToCartFetched);
  }

  async function removingItemsFromCart(foodId: number) {
    setBtnPulse(true);
    const removeItemFromCartFetched = await fetchRemoveFromCart(foodId);
    setCartItems(removeItemFromCartFetched);
    setBtnPulse(false);
    console.log(`In the app: ${btnPulse}`);
  }
  async function removeItemCompletely(foodId: number) {
    setBtnPulse(true);
    const removeItemFromCartFetched = await fetchRemoveEntireImgFormCart(
      foodId
    );
    setCartItems(removeItemFromCartFetched);
    setBtnPulse(false);
    console.log(`In the app: ${btnPulse}`);
  }

  useEffect(() => {
    // if (!localStorage.getItem('token')) return;
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
    removeItemCompletely,
    btnPulse,
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
        <Route
          path="thanks_for_your_order"
          element={<ThankYouForYourOrder />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </CartProvider>
  );
}
