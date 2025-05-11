import React, { useState } from 'react'
import './WhatsAppButton.css'
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { ShoppingCart } from '@mui/icons-material'
import CustomDialog from '../CustomDialog/CustomDialog';
import DialogContentButton from '../CustomDialog/DialogContents/DialogContentButton';

function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CustomDialog open={open} onClose={() => setOpen(false)}>
        <DialogContentButton onClose={() => setOpen(false)} />
      </CustomDialog>

      <button onClick={() => setOpen(true)} className='whatsapp-button'>
        <ShoppingCart sx={{ color: '#fff', fontSize: '15px' }} />
        Adicionar ao carrinho
      </button>
    </>
  )
}

export default WhatsAppButton