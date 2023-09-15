import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './views/home/home'; 
import Landing from './views/landing/landing';
import Detail from './views/detail/detail'; 
import ProductForm from './views/productForm/productForm';
import Cart from './views/cart/cart'; 
import Navbar from './components/navbar/navbar';
import LoginForm from "./components/users/LoginForm";
import RegistrationForm from "./components/users/RegistrationForm";
import MiCuenta from "./components/users/MiCuenta";
import UpdateAccount from "./components/users/UpdateAccount";
import PurchageHistori from "./components/users/PurchaseHistory"
import './components/css/index.css';
import './App.css';
import PrivateRoute from './PrivateRoute';
import BuyPage from './views/buyPage/buyPage';


function App() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="APP">
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:sku" element={<Detail />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route element={<PrivateRoute />}>
        <Route path="/createProduct" element={<ProductForm />} />
        <Route path="/account" element={<MiCuenta />} />
        <Route path="/updateaccount" element={<UpdateAccount />} />
        <Route path="/purchases" element={<PurchageHistori />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buyPage" element={<BuyPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
