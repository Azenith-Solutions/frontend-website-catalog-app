import React from 'react'
import './Footer.css'
import { useNavigate } from 'react-router-dom';


import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import { Email, Phone, LocationOn, WhatsApp, Instagram, Facebook } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import LogoDefault from '../../assets/hardwareTech/WhiteLogo/SIMBOLO.png';
import LogoNomeDefault from '../../assets/hardwareTech/WhiteLogo/NomeComposto.png';

const styleIcons = {
    'backgroundColor': '#d9d9d9',
    'width': '40px',
    'height': '40px',
    'padding': '5px',
    'borderRadius': '50%',
    'color': '#5F1516',
    'cursor': 'pointer',

    '&:hover': {
        backgroundColor: '#e5e5e5',
    }
}

function Footer(props) {
    const { footerItems } = props;
     const navigate = useNavigate();
    
        const handleNavigation = (path) => {
    
            navigate(path);
        };
    
    return (
        <>
            <footer style={{ backgroundColor: '#5F1516', color: '#fff', minHeight: '340px' }}>
                <Container sx={{
                    maxWidth: { lg: '1600px' },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    padding: { xs: '20px 16px', lg: '20px 24px' },
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <img src={LogoDefault} alt="" style={{ height: '80px' }} />
                        <img className='logo-name-hardwareTech' src={LogoNomeDefault} alt="" style={{ height: '55px' }} />
                    </Box>
                    <ul className='footer-list'>
                        <li className='list-title'>Institucional</li>

                        <li className="list-item-menu" onClick={() => handleNavigation('/#introduction')}>
                            Sobre nós
                        </li>
                        <li className="list-item-menu" onClick={() => handleNavigation('/#quem-somos')}>
                            Quem somos
                        </li>
                        <li className="list-item-menu" onClick={() => handleNavigation('/#servicos')}>
                            Serviços
                        </li>
                        <li className="list-item-menu list-item-menu-border" onClick={() => handleNavigation('/catalogPage')}>
                            Catálogo
                        </li>
                        <li className="list-item-menu" onClick={() => handleNavigation('/#contato')}>
                            Contato
                        </li>
                    </ul>
                    <ul className='footer-list'>
                        <li className='list-title'>Nossas Informações</li>
                        <li className='list-item'><Email sx={{ height: '20px' }} />
                            <span style={{ display: 'flex', }}>
                                E-mail: <br />hardwaretech@hardwaretech.com.br</span>
                        </li>
                        <li className='list-item'><LocationOn sx={{ height: '20px' }} />
                            Endereço: <br /> Av. Rio de Janeiro, 317 - Vila Bremen, Guarulhos - SP, 07124-300
                        </li>
                        <li className='list-item'><Phone sx={{ height: '20px' }} />
                            Telefone: <br /> (11) 250807-40 | (11) 963417349
                        </li>
                    </ul>
                    <ul className='footer-list'>
                        <li className='list-title'>Nossas Redes</li>
                        <li className='list-item'>
                            <div className='container-icons-media'>
                                <WhatsApp sx={styleIcons} />
                                <Instagram sx={styleIcons} />
                                <a
                                    href="https://www.facebook.com/hardwaretech2017/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ display: 'inline-flex' }}
                                >
                                    <Facebook sx={styleIcons} />
                                </a>
                            </div>
                        </li>
                    </ul>
                </Container>
            </footer>
            <p style={{
                background: '#555454',
                textAlign: 'center',
                width: '100%',
                color: '#fff',
                padding: '5px 0px'
            }}>© 2025 HardwereTech. Todos os direitos reservados.</p>
        </>
    )
}

export default Footer