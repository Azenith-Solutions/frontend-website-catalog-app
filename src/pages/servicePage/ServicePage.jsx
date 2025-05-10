import React from 'react'
import NavBarCatalog from "../../components/navBar/NavBarCatalog"
import Footer from "../../components/footer/Footer"
import Container from '@mui/material/Container'
import CardService from '../../components/cards/CardService'
import CardCarousel from '../../components/cardCarousel/CarouselCard'
import './ServicePage.css'
import NavBarInstitucional from '../../components/navBarInstitucional/navBarInstitucional.jsx';
import ReturnButton from '../../components/ReturnButton/ReturnButton'



import { Email } from '@mui/icons-material';


export default function ServicePage() {
    return (
        <>
            <NavBarInstitucional />
            <Container sx={{
                maxWidth: { lg: '1600px' },
                marginTop: { xs: '120px', md: '200px' },
            }}>
                <ReturnButton
                    title={'Início'}
                    path={'/'}
                />
                <section className="image-text-section">
                    <div className="image-container">
                        <img
                            src="https://www.automataweb.com.br/wp-content/uploads/2019/01/DSCN4860_Rev02-1024x728.jpg"
                            alt="Service illustration"
                        />
                    </div>
                    <div className="text-container">
                        <h1>Serviço Especial</h1>
                        <h2>Introdução</h2>
                        <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </section>

                <section className="image-text-section reverse">
                    <div className="image-container">
                        <img
                            src="https://www.automataweb.com.br/wp-content/uploads/2019/01/DSCN4860_Rev02-1024x728.jpg"
                            alt="Service illustration"
                        />
                    </div>
                    <div className="text-container">
                        <h1>Negociação</h1>
                        <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <button className="cta-button">
                            <Email sx={{ fontSize: '30px' }} />
                            Solicitar Orçamento
                        </button>
                    </div>
                </section>
                
                <section className='carousel-container'>
                    <h1>Serviços Realizados</h1>
                    <CardCarousel
                        CardComponent={CardService}
                        filter='processadores'
                        uriEndPoint='http://localhost:8080'
                    />
                </section>
            </Container>
            <Footer
                footerItems={['Home', 'Serviços', 'Relacionados']}
            />
        </>
    )
}
