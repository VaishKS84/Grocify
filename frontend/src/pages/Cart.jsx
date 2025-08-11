import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaArrowLeft, FaCreditCard, FaTruck, FaCheck, FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    shippingAddress: '',
    paymentMethod: 'CASH_ON_DELIVERY',
    notes: ''
  });
  const [placingOrder, setPlacingOrder] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckoutFormChange = (e) => {
    setCheckoutForm({
      ...checkoutForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (!checkoutForm.shippingAddress.trim()) {
      alert('Please enter a shipping address');
      return;
    }

    setPlacingOrder(true);
    try {
      const orderData = {
        cartItems: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        shippingAddress: checkoutForm.shippingAddress,
        paymentMethod: checkoutForm.paymentMethod,
        notes: checkoutForm.notes
      };

      const response = await axios.post('http://localhost:8081/api/orders/place', orderData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data) {
        // Store order details for payment page
        const orderDetails = {
          orderId: response.data.id,
          totalAmount: calculateTotal(),
          itemCount: getTotalItems(),
          shippingAddress: checkoutForm.shippingAddress,
          paymentMethod: checkoutForm.paymentMethod
        };
        
        // Clear cart after successful order
        localStorage.removeItem('cart');
        setCartItems([]);
        setShowCheckout(false);
        
        // Redirect to payment page
        navigate('/payment', { state: { orderData: orderDetails } });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <div className="empty-icon">
              <FaShoppingCart />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any fresh products yet.</p>
            <Link to="/products" className="continue-shopping-btn">
              <FaArrowLeft /> Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <Link to="/products" className="back-link">
            <FaArrowLeft /> Back to Products
          </Link>
          <div className="header-content">
            <h1>Shopping Cart</h1>
            <div className="cart-badge">
              <FaShoppingCart />
              <span>{getTotalItems()} items</span>
            </div>
          </div>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items-section">
            <div className="section-header">
              <h2>Cart Items</h2>
              <span className="item-count">{getTotalItems()} products</span>
            </div>
            
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <span className="item-category">{item.category}</span>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="item-total">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary & Checkout */}
          <div className="order-summary-section">
            <div className="summary-card">
              <div className="summary-header">
                <h2>Order Summary</h2>
                <div className="delivery-info">
                  <FaTruck />
                  <span>10 Min Delivery</span>
                </div>
              </div>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="free-delivery">Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>
              
              {!showCheckout ? (
                <button 
                  onClick={() => setShowCheckout(true)}
                  className="checkout-btn"
                >
                  <FaCreditCard />
                  Proceed to Checkout
                </button>
              ) : (
                <div className="checkout-form">
                  <div className="form-group">
                    <label>
                      <FaTruck />
                      Shipping Address
                    </label>
                    <textarea
                      name="shippingAddress"
                      value={checkoutForm.shippingAddress}
                      onChange={handleCheckoutFormChange}
                      rows="3"
                      placeholder="Enter your complete shipping address"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>
                      <FaCreditCard />
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={checkoutForm.paymentMethod}
                      onChange={handleCheckoutFormChange}
                    >
                      <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
                      <option value="ONLINE_PAYMENT">Online Payment</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={checkoutForm.notes}
                      onChange={handleCheckoutFormChange}
                      rows="2"
                      placeholder="Any special instructions..."
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="back-btn"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={placingOrder}
                      className="place-order-btn"
                    >
                      {placingOrder ? (
                        <>
                          <div className="spinner-small"></div>
                          Placing Order...
                        </>
                      ) : (
                        <>
                          <FaCheck />
                          Place Order
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
              
              <div className="continue-shopping">
                <Link to="/products">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

