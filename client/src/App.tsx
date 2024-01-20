import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import { MenuPageWrap } from './components/MenuPageWrap';
import { MenuDetails } from './components/MenuDetails';
import { ChooseDrinks } from './components/ChooseDrink';

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<MenuPageWrap />} />
        <Route path="product/:foodId" element={<MenuDetails />} />
        <Route path="drinks/" element={<ChooseDrinks />} />
      </Routes>
    </>
  );
}
