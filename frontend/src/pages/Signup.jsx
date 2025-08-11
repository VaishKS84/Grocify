import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPhone, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [activeTab, setActiveTab] = useState('password');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER'
  });
  const [otpData, setOtpData] = useState({
    phone: '',
    otp: '',
    generatedOtp: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (e.target.name in fieldErrors) {
      setFieldErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleOtpChange = (e) => {
    setOtpData({
      ...otpData,
      [e.target.name]: e.target.value
    });
  };

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpData(prev => ({ ...prev, generatedOtp: otp }));
    setOtpSent(true);
    // In a real app, this would be sent via SMS/email
    alert(`Your OTP is: ${otp}`);
  };

  const evaluatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return Math.min(score, 4);
  };

  const passwordStrength = useMemo(() => evaluatePasswordStrength(formData.password), [formData.password]);

  const strengthLabel = ['Weak', 'Fair', 'Good', 'Strong'];

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const newFieldErrors = {};
    if (!formData.username || formData.username.trim().length < 3) {
      newFieldErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.email) {
      newFieldErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newFieldErrors.email = 'Enter a valid email address';
    }
    if (!formData.password || formData.password.length < 6) {
      newFieldErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newFieldErrors.confirmPassword = 'Passwords do not match';
    }
    if (!termsAccepted) {
      newFieldErrors.terms = 'You must accept the Terms to continue';
    }
    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setError('Please correct the highlighted fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(formData.username, formData.password, 'USER');
      setSuccessMsg('Account created successfully. Redirecting...');
      setTimeout(() => navigate('/'), 800);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    if (otpData.otp !== otpData.generatedOtp) {
      setError('Invalid OTP');
      return;
    }
    if (!termsAccepted) {
      setError('You must accept the Terms to continue');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await register(formData.username, formData.password, 'USER');
      setSuccessMsg('Account created successfully. Redirecting...');
      setTimeout(() => navigate('/'), 800);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-header">
            <Link to="/" className="back-link">
              <FaArrowLeft />
              Back to Home
            </Link>
            <h1>Create Your Account</h1>
            <p>Join thousands of happy customers who trust Grocify</p>
          </div>

          <div className="auth-form-container">
            {/* Tab Navigation */}
            <div className="auth-tabs">
              <button
                type="button"
                className={`auth-tab ${activeTab === 'password' ? 'active' : ''}`}
                onClick={() => setActiveTab('password')}
              >
                <FaLock />
                Password Signup
              </button>
              <button
                type="button"
                className={`auth-tab ${activeTab === 'otp' ? 'active' : ''}`}
                onClick={() => setActiveTab('otp')}
              >
                <FaPhone />
                OTP Signup
              </button>
            </div>

            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}
            {successMsg && (
              <div className="success-message">
                <FaCheckCircle />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <form className="auth-form" onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Choose a username"
                    />
                  </div>
                  {fieldErrors.username && <div className="field-error">{fieldErrors.username}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your email"
                    />
                  </div>
                  {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
                </div>
                <div className="form-group">
                  <div className="field-hint">Accounts are created as Regular Users. Admin access is managed internally.</div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="password-strength">
                    <div className={`strength-bar ${passwordStrength >= 1 ? 'active' : ''}`}></div>
                    <div className={`strength-bar ${passwordStrength >= 2 ? 'active' : ''}`}></div>
                    <div className={`strength-bar ${passwordStrength >= 3 ? 'active' : ''}`}></div>
                    <div className={`strength-bar ${passwordStrength >= 4 ? 'active' : ''}`}></div>
                    <span className={`strength-label ${['weak','fair','good','strong'][Math.max(0,passwordStrength-1)] || 'weak'}`}>
                      {formData.password ? strengthLabel[Math.max(0, passwordStrength-1)] : 'Enter a strong password'}
                    </span>
                  </div>
                  {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && <div className="field-error">{fieldErrors.confirmPassword}</div>}
                </div>

                <div className="terms">
                  <label>
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                  {fieldErrors.terms && <div className="field-error">{fieldErrors.terms}</div>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="submit-button"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}

            {/* OTP Tab */}
            {activeTab === 'otp' && (
              <form className="auth-form" onSubmit={handleOtpSubmit}>
                <div className="form-group">
                  <label htmlFor="username-otp">Username</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      id="username-otp"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Choose a username"
                    />
                  </div>
                  {fieldErrors.username && <div className="field-error">{fieldErrors.username}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email-otp">Email</label>
                  <div className="input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input
                      id="email-otp"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your email"
                    />
                  </div>
                  {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
                </div>

                <div className="form-group">
                  <div className="field-hint">Accounts are created as Regular Users. Admin access is managed internally.</div>
                </div>

                <div className="form-group">
                  <label htmlFor="password-otp">Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      id="password-otp"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword-otp">Confirm Password</label>
                  <div className="input-wrapper">
                    <FaLock className="input-icon" />
                    <input
                      id="confirmPassword-otp"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="input-wrapper">
                    <FaPhone className="input-icon" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={otpData.phone}
                      onChange={handleOtpChange}
                      className="form-input"
                      placeholder="Enter your phone number"
                    />
                    <button
                      type="button"
                      className="submit-button"
                      onClick={generateOtp}
                      disabled={otpSent}
                    >
                      {otpSent ? 'OTP Sent' : 'Send OTP'}
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <div className="form-group">
                    <label htmlFor="otp">Enter OTP</label>
                    <div className="input-wrapper">
                      <FaPhone className="input-icon" />
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        required
                        value={otpData.otp}
                        onChange={handleOtpChange}
                        className="form-input"
                        placeholder="Enter 6-digit OTP"
                        maxLength="6"
                      />
                    </div>
                  </div>
                )}

                <div className="terms">
                  <label>
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !otpSent}
                  className="submit-button"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}

            <div className="auth-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          <div className="auth-features">
            <div className="feature-item">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Get your groceries delivered in just 10 minutes</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Signup</h3>
              <p>Your data is protected with industry-standard security</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Enjoy competitive prices and great deals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
