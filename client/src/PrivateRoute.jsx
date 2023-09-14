import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  // const token = localStorage.getItem('token');
  const user=useSelector(state=>(state.user))
  const token=user?.token ? user.token : "No existe"
// console.log();
  return  (
    token ==='No existe'? <Navigate to= "/login"/> : <Outlet/>
    )
};

export default PrivateRoute;