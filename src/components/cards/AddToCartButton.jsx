import { useState } from 'react'
import './AddToCartButton.css'
import { ShoppingCart, Add, Remove } from '@mui/icons-material'
import CustomDialog from '../CustomDialog/CustomDialog';
import DialogContentButton from '../CustomDialog/DialogContents/DialogContentButton';
import { addItemToCart } from '../../services/catalogService/catalogService';

function AddToCartButton({ componente }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  function addItemToLocalCart(component, qty) {
    addItemToCart({ ...component, quantidadeCarrinho: qty });
  }

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      <CustomDialog size={"sm"} open={open} onClose={() => setOpen(false)}>
        <DialogContentButton onClose={() => setOpen(false)} />
      </CustomDialog>

      <div className="add-to-cart-container">
        <div className="qty-control">
          <button
            type="button"
            className="qty-btn left-border-radius "
            onClick={handleDecrease}
            disabled={quantity === 1}
            aria-label="Diminuir quantidade"
          >
            <Remove fontSize="small" />
          </button>
          <span className="qty-value">{quantity}</span>
          <button
            type="button"
            className="qty-btn right-border-radius"
            onClick={handleIncrease}
            aria-label="Aumentar quantidade"
          >
            <Add fontSize="small" />
          </button>
        </div>
        <button
          onClick={() => {
            setOpen(true);
            addItemToLocalCart(componente, quantity);
          }}
          className="add-to-cart-button"
        >
          <ShoppingCart sx={{ color: '#fff', fontSize: '18px' }} />
          Adicionar
        </button>
      </div>
    </>
  )
}

export default AddToCartButton