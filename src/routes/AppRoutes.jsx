import React from 'react'
import LandingPage from '../pages/LandingPage.jsx'
import { Routes, Route } from 'react-router-dom'

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage/>} />
    </Routes>
  )
}

export default AppRoutes