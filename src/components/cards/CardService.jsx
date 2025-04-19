import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import SaibaMaisButton from './SaibaMaisButton';
import './CardService.css';

function CardService({ props }) {
  return (
    <Card className="card-service">
      <CardMedia
        className="card-service-media"
        image="https://www.automataweb.com.br/wp-content/uploads/2019/01/DSCN4860_Rev02-1024x728.jpg"
        title="component"
      />
      <CardContent className="card-service-content">
        <p className="card-content-title">{props.title}</p>
        <p className="card-content-desc">{props.desc}</p>
      </CardContent>
      <div className="card-button-container">
        <SaibaMaisButton />
      </div>
    </Card>
  );
}

export default CardService;
