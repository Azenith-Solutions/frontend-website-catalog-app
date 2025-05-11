import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function SaibaMaisButton(props) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(`/service/${props.idService}`)}
      variant="contained"
      sx={{ backgroundColor: '#67121B', width: '80%' }}
    >
      Saiba Mais
    </Button>
  );
}

export default SaibaMaisButton;
