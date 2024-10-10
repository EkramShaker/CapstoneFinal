import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import axios from 'axios';
import { OrderContext } from '../context/OrderContext'; 

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, setUser } = useContext(OrderContext); 
  const navigate = useNavigate();

  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setErrorMessage(''); 
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage(''); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setUser(res.data.user); 
      setShowLogin(false); 
      navigate('/');
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      setUser(res.data.user); 
      setShowLogin(false); 
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setErrorMessage('Registration failed. Try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');  
      setUser(null); 
      navigate('/'); 
    } catch (error) {
      setErrorMessage('Failed to log out. Try again.');
    }
  };

  return (
    <header className="header">
      <Link to="/">
        <img src="/logo/coffeelogo.png" alt="CodeBrew Cafe Logo" className="logo" />
      </Link>
      <nav>
        <Link to="/menu">Menu</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/orders">Orders</Link>
      </nav>
      {!user ? (
        <button onClick={toggleLogin} className="login-button">
          {showLogin ? 'Close' : 'Login / Register'}
        </button>
      ) : (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}

      {showLogin && (
        <div className="login-form-header">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {isRegistering ? (
            <>
              <h2>Register</h2>
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Register</button>
                <p>
                  Already have an account?{' '}
                  <span onClick={toggleRegister}>Login here</span>
                </p>
              </form>
            </>
          ) : (
            <>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
                <p>
                  Don’t have an account?{' '}
                  <span onClick={toggleRegister}>Register here</span>
                </p>
              </form>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
