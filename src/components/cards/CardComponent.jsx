import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import MemoryIcon from '@mui/icons-material/Memory';

import AddToCartButton from './AddToCartButton';
import Tooltip from '@mui/material/Tooltip';

import './CardComponent.css'

const API_IMAGES_URL = "http://localhost:8080/api/uploads/images/";

function CardComponent({ props }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const handleCardClick = () => {
    navigate(`/component/details/${props.idComponente}`);
  };

  const showPlaceholder = !props.imagem || imgError;

  return (
    <Card
      className="card-hover"
      sx={{
        flex: 1,
        minWidth: 210,
        maxWidth: 250,
        height: 300,
        borderRadius: '6px',
        boxShadow: '-5px 5px 18px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1)'
      }}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      onKeyPress={e => { if (e.key === 'Enter') handleCardClick(); }}
    >
      {showPlaceholder ? (
        <Box sx={{
          height: 136,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          flexShrink: 0,
        }}>
          <MemoryIcon sx={{ fontSize: 64, color: '#bdbdbd' }} />
        </Box>
      ) : (
        <CardMedia
          component="img"
          sx={{ height: 136, objectFit: 'cover' }}
          image={`${API_IMAGES_URL}${props.imagem}`}
          title="component"
          onError={() => setImgError(true)}
        />
      )}
      <CardContent sx={{ padding: '9px 16px 0px 16px' }}>
        {/* <p className='card-content-price'>Em estoque: {props.quantidade}</p> */}
        <Tooltip title={props.nomeComponente == null ? props.descricao : props.nomeComponente} placement="top" arrow>
          <p className='card-content-title'>{props.nomeComponente == null ? props.descricao : props.nomeComponente}</p>
        </Tooltip>
        <p className='card-content-desc'>{props.descricao}</p>
      </CardContent>
      <div className='card-button-container' onClick={e => e.stopPropagation()}>
        <AddToCartButton componente={props} />
      </div>
    </Card>
  )
}

export default CardComponent