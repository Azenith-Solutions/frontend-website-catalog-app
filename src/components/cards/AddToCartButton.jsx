import { useState } from 'react'
import './AddToCartButton.css'
import { ShoppingCart } from '@mui/icons-material'
import CustomDialog from '../CustomDialog/CustomDialog';
import DialogContentButton from '../CustomDialog/DialogContents/DialogContentButton';
import { addItemToCart } from '../../services/catalogService/catalogService';

function AddToCartButton() {
  const [open, setOpen] = useState(false);
  function addItemToLocalCart() {
    // Observação - João: cenário real deve passar apenas um item por vez
    const componentId1 = 1;
    const quantity1 = 2;

    const componentId2 = 3;
    const quantity2 = 1;

    const componentId3 = 5;
    const quantity3 = 4;
    addItemToCart(componentId1, quantity1);
    addItemToCart(componentId2, quantity2);
    addItemToCart(componentId3, quantity3);
  }

  return (
    <>
      <CustomDialog size={"sm"} open={open} onClose={() => setOpen(false)}>
        <DialogContentButton onClose={() => setOpen(false)} />
      </CustomDialog>

      <button onClick={() => {
        setOpen(true);
        addItemToLocalCart();
      }} className={"add-to-cart-button"}>
        <ShoppingCart sx={{ color: '#fff', fontSize: '15px' }} />
        Adicionar ao carrinho
      </button>
    </>
  )
}

export default AddToCartButton