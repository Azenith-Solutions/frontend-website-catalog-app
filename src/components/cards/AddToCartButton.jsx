import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddToCartButton.css'
import { ShoppingCart, Add, Remove } from '@mui/icons-material'
import CustomDialog from '../CustomDialog/CustomDialog';
import DialogContentButton from '../CustomDialog/DialogContents/DialogContentButton';
import { addItemToCart } from '../../services/catalogService/catalogService';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function AddToCartButton({ componente }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [invalidDialog, setInvalidDialog] = useState(false);
  const navigate = useNavigate();

  function addItemToLocalCart(component, qty) {
    if (isNaN(qty) || qty < 1) {
      setInvalidDialog(true);
    } else {
      setOpen(true);
      addItemToCart({ ...component, quantidadeCarrinho: qty });
    }
  }

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleInvalidDialogClose = () => {
    setInvalidDialog(false);
    setQuantity(1);
  };

  return (
    <>
      <CustomDialog size={"sm"} open={open} onClose={() => setOpen(false)}>
        <DialogContentButton icon={CheckCircleIcon}
          iconProps={{
            sx: {
              color: '#4caf50',
              fontSize: '5rem',
              marginBottom: '10px',
              backgroundColor: '#E3FFE3',
              borderRadius: '30%',
              padding: '5px',
            }
          }}
          text="Componente adicionado ao carrinho"
          buttonLabel="Ir ao Carrinho"
          buttonIcon={ShoppingCart}
          onButtonClick={() => {
            setOpen(false);
            navigate('/cart');
          }} />
      </CustomDialog>

      <CustomDialog size={"xs"} open={invalidDialog} onClose={handleInvalidDialogClose}>
        <DialogContentButton
          icon={WarningIcon}
          iconProps={{
            sx: {
              color: '#b71c1c',
              fontSize: '5rem',
              marginBottom: '10px',
              backgroundColor: '#FFF3E3',
              borderRadius: '30%',
              padding: '5px',
            }
          }}
          text="Insira uma quantidade válida!"
          buttonLabel="OK"
          onButtonClick={handleInvalidDialogClose}
          textStyle={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}
        />
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
          <input
            type="number"
            className="qty-value"
            min={1}
            value={quantity}
            onChange={e => {
              const val = parseInt(e.target.value, 10);
              setQuantity(isNaN(val) || val < 1 ? '' : val);
            }}
            aria-label="Quantidade"
          />
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