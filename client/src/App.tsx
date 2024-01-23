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
import { type FoodMenu } from './lib/api';

const tokenKey = 'react-context-jwt';

export default function App() {
  const [cartItems, setCartItems] = useState<FoodMenu[]>();

  async function fetchingTheCartItems() {
    const fetchingCartItems = await fetch('/api/Carts');
    const awaitedCartData = await fetchingCartItems.json();
    setCartItems(awaitedCartData);
  }

  async function addingItemsToCart() {
    const addItemToCartFetched = await fetch('/api/Carts/add', {
      method: 'POST',
      body: 'application/json',
    });
    const itemsAddingToCartJSON = await addItemToCartFetched.json();
  }

  async function reomovingItemFromCart() {
    const RemoveItemFromCartFetched = await fetch('/api/Carts/remove', {
      method: 'DELETE',
      body: 'application/json',
    });
    const itemsRemovingFromCartJSON = await RemoveItemFromCartFetched.json();
  }

  useEffect(() => {});
  return (
    <>
      <Routes>
        <Route index element={<IntroScreen />} />
        <Route path="/menu" element={<MenuPageWrap />} />
        <Route path="signIn/" element={<SignInForm />} />
        <Route path="signUp/" element={<SignUpForm />} />
        <Route path="product/:foodId" element={<MenuDetails />} />
        <Route path="drinks/" element={<ChooseDrinks />} />
        <Route path="order_conformation/" element={<OrderConfirmation />} />
      </Routes>
    </>
  );
}
