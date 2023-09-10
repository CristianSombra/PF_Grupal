import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imglandp from '../../assets/landing.png';
import './landing.css';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Landing() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user)
      }).catch((error) => {
        console.log(error)
      });
  }

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-dark text-white py-5 min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <img src={imglandp} alt="landing" className="img-fluid" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-4">Mejora tu espacio de trabajo</h1>
            <h1 className="display-4">Las mejores PCs y notebooks del 2023</h1>
            <div className="formContainer">
              <form>
                <h4>Email:</h4>
                <input
                  type="text"
                  placeholder="Your Email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
                <h4>Password:</h4>
                <input
                  type="password"
                  placeholder="Your Password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                />
              </form>
              <button className="btn btn-primary btn-lg mt-3" onClick={() => navigate('/home')}>
                Sign In
              </button>
              <button className="btn btn-primary btn-lg mt-3" onClick={signInWithGoogle}>
                Sign In With Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
