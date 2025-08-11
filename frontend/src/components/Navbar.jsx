import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaHome, FaBox, FaUser, FaSignOutAlt, FaCrown } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Update cart item count
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart');
      if (cart) {
        const cartItems = JSON.parse(cart);
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(count);
      }
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <FaBox className="nav-icon" />
          Grocify
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <FaHome className="nav-icon" />
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              <FaBox className="nav-icon" />
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link cart-link">
              <FaShoppingCart className="nav-icon" />
              Cart
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>
          </li>
          {isAuthenticated() ? (
            <>
              {isAdmin() && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link admin-link">
                    <FaCrown className="nav-icon" />
                    Admin
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <span className="nav-link user-info">
                  <FaUser className="nav-icon" />
                  {user?.username} ({user?.role})
                </span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link logout-btn">
                  <FaSignOutAlt className="nav-icon" />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <FaUser className="nav-icon" />
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link signup-link">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
