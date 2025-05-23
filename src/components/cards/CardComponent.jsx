import React from 'react'
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import AddToCartButton from './AddToCartButton';
import Tooltip from '@mui/material/Tooltip';



import './CardComponent.css'


function CardComponent({ props }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Card sx={{
      flex: 1,
      minWidth: 210,
      maxWidth: 250,
      height: 300,
      borderRadius: '6px',
      boxShadow: '-5px 5px 18px 10px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <CardMedia
        sx={{ height: 136, backgroundSize: 'cover' }}
        image="https://www.automataweb.com.br/wp-content/uploads/2019/01/DSCN4860_Rev02-1024x728.jpg"
        title="component"
      />
      <CardContent sx={{ padding: '9px 16px 0px 16px' }}>
        <p className='card-content-price'>Em estoque: {props.quantidade}</p>
        <Tooltip title={props.descricao}>
          <p className='card-content-title'>{props.descricao}</p>
        </Tooltip>
        <p className='card-content-desc'>{props.desc}</p>
      </CardContent>
      <div className='card-button-container'>
        {/*Trocar o price pelo id do component */}
        <button className='card-button-more' onClick={() => handleNavigation(`/component/details/${props.idComponente}`)}>
          Saiba mais
        </button>
        <AddToCartButton
          componente={props}
        />
      </div>
    </Card>
  )
}

export default CardComponent