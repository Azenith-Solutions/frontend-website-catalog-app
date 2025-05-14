import React from 'react'
import LandingPage from '../pages/LandingPage/LandingPage.jsx'
import CartPage from '../pages/CartPage/CartPage.jsx'
import ServicePage from '../pages/servicePage/ServicePage.jsx'
import { Routes, Route } from 'react-router-dom'
import ProductPage from '../pages/ProductPage/ProductPage.jsx'
import CatalogPage from '../pages/CatalogPage/CatalogPage.jsx'
import ScrollTo from '../components/ScrollTo/ScrollTo.jsx'
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton.jsx'
import DialogContentFormComponent from '../components/CustomDialog/DialogContents/DialogContentFormComponent.jsx'
import CustomDialog from '../components/CustomDialog/CustomDialog.jsx'
import DialogContentFormService from '../components/CustomDialog/DialogContents/DialogContentFormService.jsx'

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
        <Route path="/dailogTest" element={
          <CustomDialog
            size={"md"}
            open={true}>
            <DialogContentFormComponent
              onSubmit={(data) => {
                console.log("Dados do formulário:", data);
              }} />
          </CustomDialog>
        } />
        <Route path="/dailogTest2" element={
          <CustomDialog
            size={"md"}
            open={true}>
            <DialogContentFormService
              onSubmit={(data) => {
                console.log("Dados do formulário:", data);
              }} />
          </CustomDialog>
        } />
      </Routes>
    </>
  )
}

export default AppRoutes