import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import { MenuPageWrap } from './components/MenuPageWrap';
import { MenuDetails } from './components/MenuDetails';
import { ChooseDrinks } from './components/ChooseDrink';
import { OrderConfirmation } from './components/Order_confirmation';
import { SignUpForm } from './components/SignUp';
import { SignInForm } from './components/SignIn';

export default function App() {
  return (
    <>
      <Routes>
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
