import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import { MenuPageWrap } from './components/MenuPageWrap';

export default function App() {



  return (
    <>
     <Routes>
        <Route index element={<MenuPageWrap />} />
      </Routes>


    </>
  );
}
