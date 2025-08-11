import React, { useState, useEffect } from 'react';
import { FaStar, FaThumbsUp, FaComment, FaUser, FaCalendar, FaTrash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    productId: '',
    rating: 5,
    comment: '',
    feedbackType: 'REVIEW',
    isPublic: true
  });
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      fetchFeedback();
      fetchProducts();
    }
    setLoading(false);
  }, [isAuthenticated]);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/feedback/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.productId || !formData.comment.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post('http://localhost:8081/api/feedback/submit', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('Feedback submitted successfully!');
      setFormData({
        productId: '',
        rating: 5,
        comment: '',
        feedbackType: 'REVIEW',
        isPublic: true
      });
      setShowForm(false);
      fetchFeedback();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (feedbackId) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8081/api/feedback/${feedbackId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Feedback deleted successfully!');
      fetchFeedback();
    } catch (error) {
      console.error('Error deleting feedback:', error);
      alert('Failed to delete feedback. Please try again.');
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getFeedbackTypeIcon = (type) => {
    switch (type) {
      case 'REVIEW':
        return <FaStar className="h-4 w-4 text-yellow-500" />;
      case 'SUGGESTION':
        return <FaThumbsUp className="h-4 w-4 text-blue-500" />;
      case 'COMPLAINT':
        return <FaComment className="h-4 w-4 text-red-500" />;
      default:
        return <FaComment className="h-4 w-4 text-gray-500" />;
    }
  };

  const getFeedbackTypeLabel = (type) => {
    switch (type) {
      case 'REVIEW':
        return 'Review';
      case 'SUGGESTION':
        return 'Suggestion';
      case 'COMPLAINT':
        return 'Complaint';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading feedback...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaComment className="mx-auto h-24 w-24 text-gray-300" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Authentication Required</h2>
          <p className="mt-2 text-gray-600">Please log in to view and submit feedback.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Feedback</h1>
          <p className="text-gray-600">Share your thoughts and help us improve our services</p>
        </div>

        {/* Submit Feedback Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            {showForm ? 'Cancel' : 'Submit New Feedback'}
          </button>
        </div>

        {/* Feedback Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product
                  </label>
                  <select
                    name="productId"
                    value={formData.productId}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select a product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback Type
                  </label>
                  <select
                    name="feedbackType"
                    value={formData.feedbackType}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="REVIEW">Review</option>
                    <option value="SUGGESTION">Suggestion</option>
                    <option value="COMPLAINT">Complaint</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className="focus:outline-none"
                    >
                      <FaStar
                        className={`h-6 w-6 ${
                          star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {formData.rating} out of 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleFormChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Share your experience, suggestions, or concerns..."
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleFormChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Make this feedback public (visible to other customers)
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Feedback List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">All Feedback</h2>
          </div>
          
          {feedback.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <FaComment className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-2 text-gray-600">No feedback available yet.</p>
              <p className="text-sm text-gray-500">Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {feedback.map((item) => (
                <div key={item.id} className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getFeedbackTypeIcon(item.feedbackType)}
                        <span className="text-sm font-medium text-gray-900">
                          {getFeedbackTypeLabel(item.feedbackType)}
                        </span>
                        {!item.isPublic && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            Private
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <FaUser className="h-3 w-3 mr-1" />
                          <span>{item.user?.username || 'Anonymous'}</span>
                        </div>
                        <div className="flex items-center">
                          <FaCalendar className="h-3 w-3 mr-1" />
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                        {item.product && (
                          <span className="text-green-600 font-medium">
                            {item.product.name}
                          </span>
                        )}
                      </div>
                      
                      <div className="mb-2">
                        {renderStars(item.rating)}
                      </div>
                      
                      <p className="text-gray-700">{item.comment}</p>
                    </div>
                    
                    {/* Delete button for user's own feedback */}
                    {user && item.user && user.username === item.user.username && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Delete feedback"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;







