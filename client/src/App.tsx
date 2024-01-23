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

const tokenKey = 'react-context-jwt';

export default function App() {
  const [cartItems, setCartItems] = useState();

  useEffect(() => {});
  return (
    <>
      <Routes>
        <Route index element={<IntroScreen />} />
        <Route path="/" index element={<MenuPageWrap />} />
        <Route path="signIn/" element={<SignInForm />} />
        <Route path="signUp/" element={<SignUpForm />} />
        <Route path="product/:foodId" element={<MenuDetails />} />
        <Route path="drinks/" element={<ChooseDrinks />} />
        <Route path="order_conformation/" element={<OrderConfirmation />} />
      </Routes>
    </>
  );
}
