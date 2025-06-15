import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBarInstitucional from '../../components/navBarInstitucional/navBarInstitucional.jsx';
import Footer from '../../components/footer/Footer';
import Container from '@mui/material/Container';
import './ServicePage.css';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import { Email } from '@mui/icons-material';
import CustomDialog from '../../components/CustomDialog/CustomDialog.jsx';
import DialogContentFormService from '../../components/CustomDialog/DialogContents/DialogFormService/DialogContentFormService.jsx';
import servicesData from '../../db/services.json';

// Importações dinâmicas para as imagens
import placaseletronicas from '../../assets/hardwareTech/servicos/placaseletronicas.jpeg';
import inversores from '../../assets/hardwareTech/servicos/inversores.jpg';
import fontes from '../../assets/hardwareTech/servicos/fontes.jpeg';
import clp from '../../assets/hardwareTech/servicos/clp.jpeg';
import negociacao from '../../assets/hardwareTech/servicos/negociacao.jpg';

export default function ServicePage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [serviceInfo, setServiceInfo] = useState(null);
    const { idService } = useParams();

    const imageMap = {
        1: placaseletronicas,
        2: inversores,
        3: fontes,
        4: clp
    };

    useEffect(() => {
        const serviceId = parseInt(idService);
        
        const foundService = servicesData.services.find(service => service.id === serviceId);
        
        if (foundService) {
            setServiceInfo(foundService);
        } else {
            setServiceInfo(servicesData.services[0]);
        }
    }, [idService]);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    if (!serviceInfo) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <NavBarInstitucional />
            <Container
                sx={{
                    maxWidth: { lg: '1600px' },
                    marginTop: { xs: '120px', md: '150px' },
                }}
            >
                <ReturnButton title={'Início'} path={'/'} />
                <section className="image-text-section">
                    <div className="image-container">
                        <img
                            src={imageMap[serviceInfo.id]}
                            alt={`${serviceInfo.title} - Ilustração`}
                        />
                    </div>
                    <div className="text-container">
                        <h1>{serviceInfo.title}</h1>
                        <h2>Introdução</h2>
                        <p>{serviceInfo.intro}</p>
                    </div>
                </section>

                <section className="image-text-section reverse">
                    <div className="image-container">
                        <img
                            src={negociacao}
                            alt="Processo de negociação - Ilustração"
                        />
                    </div>
                    <div className="text-container">
                        <h1>Negociação</h1>
                        <p>{servicesData.negotiationText}</p>
                        <button className="cta-button" onClick={handleOpenDialog}>
                            <Email sx={{ fontSize: '30px' }} />
                            Solicitar Serviço
                        </button>
                    </div>
                </section>
            </Container>
            <Footer footerItems={['Home', 'Serviços', 'Relacionados']} />

            <CustomDialog size={'md'} open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogContentFormService
                    serviceName={serviceInfo.title}
                    onSubmit={(data) => {
                        console.log('Dados do formulário:', data);
                        handleCloseDialog(); 
                    }}
                />
            </CustomDialog>
        </>
    );
}