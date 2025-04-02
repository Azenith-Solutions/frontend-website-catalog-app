import React from 'react'
import '../styles/WhatsAppButton.css'
import WhatsAppIcon from "@mui/icons-material/WhatsApp";


function WhatsAppButton() {
  return (
    <button className='whatsapp-button'>
      <WhatsAppIcon sx={{ color: '#fff', fontSize: '15px' }} />
      Solicitar orçamento
    </button>
  )
}

export default WhatsAppButton