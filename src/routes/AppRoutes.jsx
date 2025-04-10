import React from 'react'
import LandingPage from '../pages/LandingPage.jsx'
import { Routes, Route } from 'react-router-dom'
import ProductPage from '../pages/ProductPage/ProductPage.jsx'

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/component/details" element={<ProductPage />} />
    </Routes>
  )
}

export default AppRoutes