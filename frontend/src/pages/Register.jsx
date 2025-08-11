import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaArrowLeft, FaEnvelope, FaMobile, FaShieldAlt, FaRocket, FaGift } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import '../styles.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      await register(formData.username, formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Register user after OTP verification
      await register(formData.username, formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowOtpForm(true);
      setError('');
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="back-link">
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
          <h1>Create Account</h1>
          <p>Join Grocify for the best grocery shopping experience</p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`auth-tab ${!showOtpForm ? 'active' : ''}`}
            onClick={() => setShowOtpForm(false)}
          >
            <FaShieldAlt />
            Direct Registration
          </button>
          <button 
            className={`auth-tab ${showOtpForm ? 'active' : ''}`}
            onClick={() => setShowOtpForm(true)}
          >
            <FaMobile />
            OTP Verification
          </button>
        </div>

        {!showOtpForm ? (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="auth-input"
              />
            </div>

            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="auth-input"
              />
            </div>

            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="auth-input"
              />
              <button
                type="button"
                className="input-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="auth-input"
              />
              <button
                type="button"
                className="input-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="auth-links">
              <span>Already have an account?</span>
              <Link to="/login" className="login-link">
                Sign In
              </Link>
            </div>
          </form>
        ) : (
          <div className="otp-container">
            {!showOtpForm ? (
              <div className="phone-input-section">
                <div className="input-wrapper">
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="auth-input"
                    maxLength="10"
                  />
                </div>
                <button 
                  onClick={sendOtp} 
                  className="auth-button"
                  disabled={isLoading || !phoneNumber}
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleOtpSubmit} className="auth-form">
                <div className="otp-info">
                  <p>We've sent a 6-digit OTP to {phoneNumber}</p>
                  <button 
                    type="button" 
                    className="resend-link"
                    onClick={sendOtp}
                    disabled={isLoading}
                  >
                    Resend OTP
                  </button>
                </div>

                <div className="otp-input-wrapper">
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="otp-input"
                    maxLength="6"
                    required
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="auth-button" disabled={isLoading || otp.length !== 6}>
                  {isLoading ? 'Verifying & Creating Account...' : 'Verify & Create Account'}
                </button>
              </form>
            )}
          </div>
        )}

        <div className="auth-features">
          <div className="feature-item">
            <FaRocket className="feature-icon" />
            <div>
              <h4>Lightning Fast</h4>
              <p>Get your groceries delivered in minutes</p>
            </div>
          </div>
          <div className="feature-item">
            <FaGift className="feature-icon" />
            <div>
              <h4>Welcome Bonus</h4>
              <p>Get ₹100 off on your first order</p>
            </div>
          </div>
          <div className="feature-item">
            <FaShieldAlt className="feature-icon" />
            <div>
              <h4>Secure & Safe</h4>
              <p>Your data is protected with bank-level security</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
