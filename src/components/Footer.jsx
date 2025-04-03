import React from 'react'
import '../styles/Footer.css'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import { Email, Phone, LocationOn, WhatsApp, Instagram, Facebook } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import LogoDefault from '../assets/hardwareTech/DefaultLogo/SIMBOLO.png';
import LogoNomeDefault from '../assets/hardwareTech/DefaultLogo/NOME.png';

const styleIcons = {
    'backgroundColor': '#d9d9d9',
    'width': '40px',
    'height': '40px',
    'padding': '5px',
    'borderRadius': '50%',
    'color': '#555454',
    'cursor': 'pointer',

    '&:hover': {
        backgroundColor: '#e5e5e5',
    }
}

function Footer(props) {
    const { footerItems } = props;
    
    return (
        <>
            <footer style={{ backgroundColor: '#555454', color: '#fff', minHeight: '340px' }}>
                <Container sx={{
                    maxWidth: { lg: '1600px' },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    padding: {xs: '20px 16px', lg: '20px 24px' },
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <img src={LogoDefault} alt="" style={{ height: '80px' }} />
                        <img className='logo-name-hardwareTech' src={LogoNomeDefault} alt="" style={{ height: '40px' }} />
                    </Box>
                    <ul className='footer-list'>
                        <li className='list-title'>Seções</li>
                        {footerItems.map((item, index) => (
                            <li className='list-item-menu' key={index}>{item}</li>
                        ))}
                    </ul>
                    <ul className='footer-list'>
                        <li className='list-title'>Nossas Informações</li>
                        <li className='list-item'><Email sx={{ height: '20px' }} />
                            <span style={{ display: 'flex', }}>
                                E-mail: <br />[contato@empresa.com]</span>
                        </li>
                        <li className='list-item'><LocationOn sx={{ height: '20px' }} />
                            Endereço: <br /> [Rua, Número, Bairro, Cidade - Estado, CEP]
                        </li>
                        <li className='list-item'><Phone sx={{ height: '20px' }} />
                            Telefone: <br /> [(XX) XXXX-XXXX] / [(XX) 9XXXX-XXXX]
                        </li>
                        <li className='list-item'><CalendarMonthIcon sx={{ height: '20px' }} />
                            Horário de atendimento: <br /> Segunda a Sexta: 08h - 18h <br />Sábados: 08h - 12h
                        </li>
                    </ul>
                    <ul className='footer-list'>
                        <li className='list-title'>Nossas Redes</li>
                        <div className='container-icons-media'>
                            <div><WhatsApp sx={styleIcons} /></div>
                            <li><Instagram sx={styleIcons} /></li>
                            <li><Facebook sx={styleIcons} /></li>
                        </div>
                    </ul>
                </Container>
            </footer>
            <p style={{
                background: '#000',
                textAlign: 'center',
                width: '100%',
                color: '#fff',
                padding: '5px 0px'
            }}>© 2025 HardwereTech. Todos os direitos reservados.</p>
        </>
    )
}

export default Footer