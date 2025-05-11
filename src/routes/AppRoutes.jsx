import React from 'react'
import LandingPage from '../pages/LandingPage/LandingPage.jsx'
import CartPage from '../pages/CartPage/CartPage.jsx'
import ServicePage from '../pages/servicePage/ServicePage.jsx'
import { Routes, Route } from 'react-router-dom'
import ProductPage from '../pages/ProductPage/ProductPage.jsx'
import CatalogPage from '../pages/CatalogPage/CatalogPage.jsx'
import ScrollTo from '../components/ScrollTo/ScrollTo.jsx'
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton.jsx'

function AppRoutes() {
  return (
    <>
      <ScrollTo />
      <ScrollToTopButton />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/service/:idService" element={<ServicePage />} />
        <Route path="/component/details/:idComponent" element={<ProductPage />} />
        <Route path="/catalogPage" element={<CatalogPage />} />
      </Routes>
    </>
  )
}

export default AppRoutes