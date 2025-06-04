import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FaMicrochip, FaExchangeAlt, FaBolt, FaCogs } from 'react-icons/fa';

import SaibaMaisButton from './SaibaMaisButton';
import './CardService.css';

function CardService({ props }) {
  const getServiceIcon = (id) => {
    switch(id) {
      case 1: return <FaMicrochip className="service-icon" />; // Placas Eletrônicas
      case 2: return <FaExchangeAlt className="service-icon" />; // Inversores
      case 3: return <FaBolt className="service-icon" />; // Fontes
      case 4: return <FaCogs className="service-icon" />; // CLPs
      default: return <FaMicrochip className="service-icon" />;
    }
  }
  
  const getBackgroundColorClass = (id) => {
    switch(id) {
      case 1: return "card-bg-circuito";
      case 2: return "card-bg-inversor";
      case 3: return "card-bg-fonte";
      case 4: return "card-bg-clp";
      default: return "card-bg-circuito";
    }
  }
  
  return (
    <div className="card-service-wrapper">
      <Card className={`card-service ${getBackgroundColorClass(props.id)}`}>
        <div className="service-icon-highlight">
          {getServiceIcon(props.id)}
        </div>
        <CardContent className="card-service-content">
          <p className="card-content-title">{props.title}</p>
          <div className="card-content-desc-container">
            <p className="card-content-desc">{props.desc}</p>
          </div>
          <div className="card-button-container">
            <SaibaMaisButton
              idService={props.id}
            />
          </div>
        </CardContent>
        <div className="card-service-pattern"></div>
      </Card>
    </div>
  );
}

export default CardService;
