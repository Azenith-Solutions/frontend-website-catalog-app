import React, { useState } from 'react';
import NavBarInstitucional from '../../components/navBarInstitucional/navBarInstitucional.jsx';
import Footer from '../../components/footer/Footer';
import Container from '@mui/material/Container';
import CardService from '../../components/cards/CardService';
import CardCarousel from '../../components/cardCarousel/CarouselCard';
import './ServicePage.css';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import { Email } from '@mui/icons-material';
import CustomDialog from '../../components/CustomDialog/CustomDialog.jsx';
import DialogContentFormService from '../../components/CustomDialog/DialogContents/DialogFormService/DialogContentFormService.jsx';

export default function ServicePage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar o modal

    // Função para abrir o modal
    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    // Função para fechar o modal
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <NavBarInstitucional />
            <Container
                sx={{
                    maxWidth: { lg: '1600px' },
                    marginTop: { xs: '120px', md: '200px' },
                }}
            >
                <ReturnButton title={'Início'} path={'/'} />
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
                        <p>
                            It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing
                            Lorem Ipsum passages, and more recently with desktop publishing software
                            like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
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
                        <p>
                            It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing
                            Lorem Ipsum passages, and more recently with desktop publishing software
                            like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                        <button className="cta-button" onClick={handleOpenDialog}>
                            <Email sx={{ fontSize: '30px' }} />
                            Solicitar Serviço
                        </button>
                    </div>
                </section>

                <section className="carousel-container">
                    <h1>Serviços Realizados</h1>
                    <CardCarousel
                        CardComponent={CardService}
                        filter="processadores"
                        uriEndPoint="http://localhost:8080"
                    />
                </section>
            </Container>
            <Footer footerItems={['Home', 'Serviços', 'Relacionados']} />

            {/* Modal controlado pelo estado */}
            <CustomDialog size={'md'} open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogContentFormService
                    onSubmit={(data) => {
                        console.log('Dados do formulário:', data);
                        handleCloseDialog(); // Fecha o modal após o envio
                    }}
                />
            </CustomDialog>
        </>
    );
}