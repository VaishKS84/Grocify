import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCreditCard, FaLock, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  const [upiDetails, setUpiDetails] = useState({
    upiId: ''
  });
  const [processing, setProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Get order details from location state or localStorage
    const orderData = location.state?.orderData || JSON.parse(localStorage.getItem('pendingOrder'));
    if (orderData) {
      setOrderDetails(orderData);
    } else {
      navigate('/cart');
    }
  }, [isAuthenticated, navigate, location]);

  const handleCardChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleUpiChange = (e) => {
    setUpiDetails({
      ...upiDetails,
      [e.target.name]: e.target.value
    });
  };

  const validateCardDetails = () => {
    if (!cardDetails.cardNumber || !cardDetails.cardHolder || 
        !cardDetails.expiryMonth || !cardDetails.expiryYear || !cardDetails.cvv) {
      return false;
    }
    if (cardDetails.cardNumber.length < 16 || cardDetails.cvv.length < 3) {
      return false;
    }
    return true;
  };

  const validateUpiDetails = () => {
    return upiDetails.upiId && upiDetails.upiId.includes('@');
  };

  const handlePayment = async () => {
    if (paymentMethod === 'card' && !validateCardDetails()) {
      alert('Please fill in all card details correctly');
      return;
    }
    if (paymentMethod === 'upi' && !validateUpiDetails()) {
      alert('Please enter a valid UPI ID');
      return;
    }

    setProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update order status to PAID
      if (orderDetails?.orderId) {
        await axios.put(`http://localhost:8081/api/orders/${orderDetails.orderId}/status`, {
          status: 'PAID'
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      }

      // Clear pending order
      localStorage.removeItem('pendingOrder');
      
      // Show success and redirect
      alert('Payment successful! Your order has been confirmed.');
      navigate('/my-orders');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Secure payment powered by Grocify</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Order ID</span>
                  <span className="font-medium">#{orderDetails.orderId || 'PENDING'}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Amount</span>
                  <span className="font-bold text-green-600">₹{orderDetails.totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Items</span>
                  <span>{orderDetails.itemCount || 0}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{orderDetails.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Security Features</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <FaLock className="h-4 w-4 text-green-500 mr-2" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaShieldAlt className="h-4 w-4 text-green-500 mr-2" />
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaCheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Secure payment gateway</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Method</h2>
              
              {/* Payment Method Selection */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      paymentMethod === 'card' 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <FaCreditCard className="h-6 w-6 mb-2" />
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-gray-500">Visa, Mastercard, RuPay</div>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      paymentMethod === 'upi' 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-2xl mb-2">💳</div>
                    <div className="font-medium">UPI Payment</div>
                    <div className="text-sm text-gray-500">Google Pay, PhonePe, Paytm</div>
                  </button>
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      maxLength="16"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        name="cardHolder"
                        value={cardDetails.cardHolder}
                        onChange={handleCardChange}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        maxLength="4"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Month
                      </label>
                      <select
                        name="expiryMonth"
                        value={cardDetails.expiryMonth}
                        onChange={handleCardChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Month</option>
                        {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                          <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Year
                      </label>
                      <select
                        name="expiryYear"
                        value={cardDetails.expiryYear}
                        onChange={handleCardChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Year</option>
                        {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Payment Form */}
              {paymentMethod === 'upi' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    value={upiDetails.upiId}
                    onChange={handleUpiChange}
                    placeholder="username@upi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Enter your UPI ID (e.g., username@okicici, username@paytm)
                  </p>
                </div>
              )}

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Pay ₹${orderDetails.totalAmount}`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By clicking "Pay", you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;







