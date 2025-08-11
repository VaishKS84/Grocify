import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Admin from './pages/Admin'
import PaymentPage from './pages/PaymentPage'
import Feedback from './pages/Feedback'
import MyOrders from './pages/MyOrders'
import './styles.css'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App
