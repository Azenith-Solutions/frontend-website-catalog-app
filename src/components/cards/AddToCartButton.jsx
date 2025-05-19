import { useState } from 'react'
import './AddToCartButton.css'
import { ShoppingCart } from '@mui/icons-material'
import CustomDialog from '../CustomDialog/CustomDialog';
import DialogContentButton from '../CustomDialog/DialogContents/DialogContentButton';
import { addItemToCart } from '../../services/catalogService/catalogService';

function AddToCartButton({componente}) {
  const [open, setOpen] = useState(false);
  function addItemToLocalCart(component) {
    addItemToCart(component);
  }

  return (
    <>
      <CustomDialog size={"sm"} open={open} onClose={() => setOpen(false)}>
        <DialogContentButton onClose={() => setOpen(false)} />
      </CustomDialog>

      <button onClick={() => {
        setOpen(true);
        addItemToLocalCart(componente);
      }} className={"add-to-cart-button"}>
        <ShoppingCart sx={{ color: '#fff', fontSize: '15px' }} />
        Adicionar ao carrinho
      </button>
    </>
  )
}

export default AddToCartButton