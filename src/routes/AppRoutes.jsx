import React from 'react'
import LandingPage from '../pages/LandingPage.jsx'
import CartPage from '../pages/CartPage/CartPage.jsx'
import ServicePage from '../pages/servicePage/ServicePage.jsx'
import { Routes, Route } from 'react-router-dom'
import ProductPage from '../pages/ProductPage/ProductPage.jsx'

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/service" element={<ServicePage/>} />
        <Route path="/component/details" element={<ProductPage />} />
    </Routes>
  )
}

export default AppRoutes