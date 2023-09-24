import React, { useEffect } from 'react';
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
import PurchageHistori from "./components/users/PurchaseHistory";
import NotFound from "./views/404/notfound";
import PrivateRoute from './PrivateRoute';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import BuyPage from './views/buyPage/buyPage';
import AdminDashboard from './views/AdminDashboard/AdminDashboard';
import './App.css';
import './components/css/index.css';
import { useDispatch } from 'react-redux';
import { loadUserById } from './redux/actions';
/* import { Payment } from './views/Payment/Payment'; */
import Wishlist from './views/wishlist/wishlist';


function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id")
    if (token && id) {
      dispatch(loadUserById(id));
    }
  }, [dispatch]);

  return (
    <div className="APP">
      {location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/detail/:sku" element={<Detail/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/registration" element={<RegistrationForm/>} />
        <Route element={<PrivateRoute />}>
        <Route path="/account" element={<MiCuenta/>} />
        <Route path="/updateaccount" element={<UpdateAccount/>} />
        <Route path="/purchases" element={<PurchageHistori/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/buyPage" element={<BuyPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* <Route path="/payments" element= {<Payment />} />  */}
        </Route>
        <Route element={<PrivateRouteAdmin />}>
        <Route path="/createProduct" element={<ProductForm/>} />
        <Route path="/dashboard" element={<AdminDashboard/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
