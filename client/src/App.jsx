import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home, Landing, Detail, ProductForm } from '../src/views/index';
import Navbar from './components/navbar/navbar';
import LoginForm from "./components/users/LoginForm"
import RegistrationForm from "./components/users/RegistrationForm"
import MiCuenta from "./components/users/MiCuenta"
import UpdateAccount from "./components/users/UpdateAccount"
import './components/css/index.css';
import './App.css'


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
        <Route path="/createProduct" element={<ProductForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/account" element={<MiCuenta />} />
        <Route path="/updateaccount" element={<UpdateAccount />} />
      </Routes>
    </div>
  );
}

export default App;
