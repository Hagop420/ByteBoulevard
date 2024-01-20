import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import { MenuPageWrap } from './components/MenuPageWrap';
import { MenuDetails } from './components/MenuDetails';

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<MenuPageWrap />} />
        <Route path="product/:foodId" element={<MenuDetails />} />
      </Routes>
    </>
  );
}
