import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DialogContentButton = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div
      className="dialog-content"
      style={{
        display: 'flex',
        paddingBottom: '25px',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <CheckCircleIcon
        sx={{
          color: '#4caf50',
          fontSize: '5rem',
          marginBottom: '10px',
          backgroundColor: '#E3FFE3',
          borderRadius: '30%',
          padding: '5px',
        }}
      />
      <p
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        Componente adicionado ao carrinho
      </p>
      <button
        className="dialog-button"
        onClick={() => {
          onClose();
          navigate('/cart');
        }}
        style={{
          backgroundColor: '#67121B',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '15px 40px',
          cursor: 'pointer',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <ShoppingCart />
        Ir ao Carrinho
      </button>
    </div>
  );
};

export default DialogContentButton;