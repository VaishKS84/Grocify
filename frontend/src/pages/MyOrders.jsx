import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaTruck, FaCreditCard, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your orders');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:8081/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setOrders(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <Link to="/login" className="text-green-600 hover:text-green-500">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link to="/" className="text-green-600 hover:text-green-500 mr-4">
            <FaArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your order history here</p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Order #{order.id}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <FaCalendar className="inline mr-1" />
                      {formatDate(order.orderDate)}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Order Details</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <FaMapMarkerAlt className="mr-2 text-green-600" />
                          <span className="font-medium">Shipping Address:</span>
                        </div>
                        <p className="text-sm text-gray-700 ml-6">{order.shippingAddress}</p>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <FaCreditCard className="mr-2 text-green-600" />
                          <span className="font-medium">Payment Method:</span>
                        </div>
                        <p className="text-sm text-gray-700 ml-6">{order.paymentMethod}</p>
                        
                        {order.notes && (
                          <>
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Notes:</span>
                            </div>
                            <p className="text-sm text-gray-700 ml-6">{order.notes}</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {order.orderItems && order.orderItems.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="h-12 w-12 object-cover rounded"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                                e.target.onerror = null;
                              }}
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-sm font-medium text-gray-900">₹{item.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">Total Amount:</span>
                      <span className="text-2xl font-bold text-green-600">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;












