import React from 'react';
import {Routes, Route, useLocation } from 'react-router-dom';
import {Home, Landing, Detail} from '../src/views/index';
import Navbar from './components/navbar/navbar';


function App() {
const location = useLocation();

React.useEffect(() => {
  window.scrollTo(0, 0);
}, [location]);

  return (
   <div className="APP">
   {location.pathname !== "/" && <Navbar />}
      <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/detail/:sku" element={<Detail/>} />
      </Routes>
   </div>
  );
}

export default App;
