import { FoodAndMilkShakesMenu } from './components/FoodAndShakesMenu';
import { Route, Routes } from 'react-router-dom';
import './css/App.css';

export default function App() {


  return (
    <>
     <Routes>
        <Route index element={<FoodAndMilkShakesMenu />} />
     </Routes>
    </>
  );
}
