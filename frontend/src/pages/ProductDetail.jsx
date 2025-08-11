import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { FaArrowLeft, FaShoppingCart, FaStar, FaCheck, FaTruck, FaShieldAlt, FaClock } from 'react-icons/fa'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:8081/api/products/${id}`)
      setProduct(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch product details')
      console.error('Error fetching product:', err)
    } finally {
      setLoading(false)
    }
  }

  const showToastMessage = (message) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleAddToCart = () => {
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        ...product,
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count in navbar
    window.dispatchEvent(new Event('storage'));
    
    showToastMessage(`${product.name} added to cart!`);
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Oops! Something went wrong</h2>
          <p>{error || 'Product not found'}</p>
          <Link to="/products" className="back-button">
            <FaArrowLeft /> Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <FaCheck className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="container">
        <Link to="/products" className="back-link">
          <FaArrowLeft /> Back to Products
        </Link>

        <div className="product-detail">
          <div className="product-image-section">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="product-detail-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
                e.target.onerror = null;
              }}
            />
            <div className="product-badge">
              {product.available ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>

          <div className="product-info-section">
            <div className="product-header">
              <div className="product-category-tag">{product.category}</div>
              <h1 className="product-title">{product.name}</h1>
            </div>

            <div className="product-price-section">
              <div className="product-price">₹{product.price}</div>
              <div className="product-rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="star-icon" />
                  ))}
                </div>
                <span className="rating-text">4.8 (120 reviews)</span>
              </div>
            </div>

            {product.description && (
              <div className="product-description">
                <h3>About this product</h3>
                <p>{product.description}</p>
              </div>
            )}

            <div className="product-features">
              <div className="feature-item">
                <FaTruck className="feature-icon" />
                <span>10 Min Delivery</span>
              </div>
              <div className="feature-item">
                <FaShieldAlt className="feature-icon" />
                <span>Quality Assured</span>
              </div>
              <div className="feature-item">
                <FaClock className="feature-icon" />
                <span>Fresh Daily</span>
              </div>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="quantity-select"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.available}
                className="add-to-cart-button large"
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <strong>Category:</strong> {product.category}
              </div>
              <div className="meta-item">
                <strong>Product ID:</strong> #{product.id}
              </div>
              <div className="meta-item">
                <strong>Availability:</strong> 
                <span className={`status ${product.available ? 'available' : 'unavailable'}`}>
                  {product.available ? ' In Stock' : ' Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
