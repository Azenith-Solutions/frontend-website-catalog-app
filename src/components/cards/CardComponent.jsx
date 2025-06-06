import React from 'react'
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import AddToCartButton from './AddToCartButton';
import Tooltip from '@mui/material/Tooltip';

import './CardComponent.css'

const API_IMAGES_URL = "http://localhost:8080/api/uploads/images/";
const defaultImage = "https://www.automataweb.com.br/wp-content/uploads/2019/01/DSCN4860_Rev02-1024x728.jpg";

function CardComponent({ props }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/component/details/${props.idComponente}`);
  };

    // Função para obter a URL da imagem do componente
  const getImageUrl = (item) => {
    if (item.imagem) {
      return `${API_IMAGES_URL}${item.imagem}`;
    }
    return defaultImage;
  };

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
      <CardMedia
        sx={{ height: 136, backgroundSize: 'cover' }}
        image={getImageUrl(props)}
        title="component"
      />
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