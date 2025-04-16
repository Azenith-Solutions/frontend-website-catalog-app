import React from 'react'
import LandingPage from '../pages/LandingPage.jsx'
import CartPage from '../pages/CartPage/CartPage.jsx'
import { Routes, Route } from 'react-router-dom'

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/cart" element={<CartPage/>} />
    </Routes>
  )
}

export default AppRoutes