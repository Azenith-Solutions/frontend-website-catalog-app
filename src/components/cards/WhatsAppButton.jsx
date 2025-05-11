import React from 'react'
import './WhatsAppButton.css'
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { ShoppingCart } from '@mui/icons-material'


function WhatsAppButton() {
  return (
    <button className='whatsapp-button'>
      <ShoppingCart sx={{ color: '#fff', fontSize: '15px' }} />
      Adicionar ao carrinho
    </button>
  )
}

export default WhatsAppButton