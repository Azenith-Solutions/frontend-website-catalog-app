import React, { useState } from 'react'
import './WhatsAppButton.css'
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { ShoppingCart } from '@mui/icons-material'
import CustomDialog from '../CustomDialog/CustomDialog';
import DialogContentButton from '../CustomDialog/DialogContents/DialogContentButton';
import { setItemsToLocalStorage } from '../../services/catalogService/catalogService';

function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  function addItemToLocalCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const newItem = {
      "fkComponente": 2,
      "quantidade": 1
    }

    setItemsToLocalStorage([...cartItems, newItem]);
  }

  return (
    <>
      <CustomDialog size={"sm"} open={open} onClose={() => setOpen(false)}>
        <DialogContentButton onClose={() => setOpen(false)} />
      </CustomDialog>

      <button onClick={() => {
        setOpen(true);
        addItemToLocalCart();
      }} className='whatsapp-button'>
        <ShoppingCart sx={{ color: '#fff', fontSize: '15px' }} />
        Adicionar ao carrinho
      </button>
    </>
  )
}

export default WhatsAppButton