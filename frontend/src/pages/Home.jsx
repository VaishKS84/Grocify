import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: '🚚',
      title: '10 Minute Delivery',
      description: 'Get your groceries delivered in just 10 minutes with our lightning-fast service.'
    },
    {
      icon: '🛡️',
      title: 'Best Quality',
      description: 'We source only the freshest and highest quality products for your family.'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Enjoy competitive prices and great deals on all your grocery needs.'
    },
    {
      icon: '📱',
      title: 'Easy Ordering',
      description: 'Simple and intuitive app to order groceries with just a few taps.'
    }
  ];

  const categories = [
    {
      name: 'Fresh Fruits',
      description: 'Organic and fresh fruits',
      image: 'https://images.unsplash.com/photo-1619566636858-adc3d3c3d3c3?w=400&h=300&fit=crop'
    },
    {
      name: 'Fresh Vegetables',
      description: 'Farm fresh vegetables',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop'
    },
    {
      name: 'Dairy & Eggs',
      description: 'Fresh dairy products',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop'
    },
    {
      name: 'Bread & Bakery',
      description: 'Freshly baked goods',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop'
    },
    {
      name: 'Meat & Fish',
      description: 'Quality meat and seafood',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop'
    },
    {
      name: 'Beverages',
      description: 'Refreshing drinks',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Groceries Delivered in 10 Minutes</h1>
            <p>Get fresh groceries delivered to your doorstep in just 10 minutes. Quality products, best prices, and lightning-fast delivery.</p>
            <Link to="/products" className="cta-button">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Grocify?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of happy customers who trust Grocify for their daily grocery needs.</p>
            <div className="cta-buttons">
              <Link to="/products" className="cta-button primary">
                Start Shopping
              </Link>
              <Link to="/signup" className="cta-button secondary">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;