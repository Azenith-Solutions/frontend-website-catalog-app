import React, {useState} from 'react';
import NavBarCatalog from '../../components/navBar/NavBarCatalog';
import Carrosel from '../../components/Carrosel/Carrosel';
import PaginatedFilterSection from '../../components/pagination/PaginatedFilterSection';
import CardComponent from '../../components/cards/CardComponent';
import CarouselCard from '../../components/cardCarousel/CarouselCard';
import Footer from '../../components/footer/Footer';

import { Container } from '@mui/material';

import { ShoppingBagIcon } from '@heroicons/react/solid';
import { StarIcon } from '@heroicons/react/solid';

import background from './Styles/assets/background abstrato.png';
import './Styles/CatalogPage.css';
import CustomDialog from '../../components/CustomDialog/CustomDialog';
import DialogContentFormComponent from '../../components/CustomDialog/DialogContents/DialogFormComponent/DialogContentFormComponent';

const CatalogPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar o modal

    // Função para abrir o modal
    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    // Função para fechar o modal
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const sections = [
        { title: 'Componentes', anchor: 'componentes' },
        { title: 'Mais Vendidos', anchor: 'mais-vendidos' },
        { title: 'Novidades', anchor: 'novidades' },
    ];
    return (
        <>
            <div
                className="catalog-background"
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    minHeight: '200vh'
                }}
            >
                <NavBarCatalog
                    menuItems={sections}
                />
                <Carrosel />
                <Container
                    sx={{
                        maxWidth: { lg: '1600px' },
                    }}
                >
                    <div id='mais-vendidos' className='Section-Mais-Vendidos section'>
                        <div className="section-title">
                            <span className="icon">
                                <ShoppingBagIcon className="w-4 h-4 text-[#5c1a1b]" />
                            </span>
                            <span className="text">Mais Vendidos</span>
                            <div className="line"></div>
                        </div>
                        <CarouselCard
                            CardComponent={CardComponent}
                            filter="Processador"
                            uriEndPoint="http://Localhost:8080/products"
                        />
                    </div>
                    <div id='novidades' className='Section-Novidades section'>
                        <div className="section-title">
                            <span className="icon">
                                <StarIcon className="w-4 h-4 text-[#5c1a1b]" />
                            </span>
                            <span className="text">Novidades</span>
                            <div className="line"></div>
                        </div>
                        <CarouselCard
                            CardComponent={CardComponent}
                            filter="Processador"
                            uriEndPoint="http://Localhost:8080/products"
                        />
                    </div>
                </Container>

                <div id='componentes' style={{ margin: '5vh 0' }} className='section'>
                    <PaginatedFilterSection
                        filters={[
                            { label: 'Todos', value: 'todos' },
                            { label: 'Promoções', value: 'promocoes' },
                            { label: 'Novidades', value: 'novidades' },
                        ]}
                        CardComponent={CardComponent}
                        priceFilterEnabled={true}
                        uriEndPoint={'/products'}
                    />
                </div>
                <div className='section-call-to-action'>
                    <div className="section-title-action">
                        <h2>Não encontrou o componente que deseja? Fale conosco!</h2>
                        <button onClick={handleOpenDialog}>Enviar E-mail</button>
                    </div>
                </div>
                <footer>
                    <Footer
                        footerItems={[
                            'Sobre nós',
                            'Contato',
                            'Ajuda'
                        ]}
                    />
                </footer>
            </div>
            <CustomDialog
                size={"md"}
                open={isDialogOpen}
                onClose={handleCloseDialog} // Passa o controlador para fechar o modal
            >
                <DialogContentFormComponent
                    onSubmit={(data) => {
                        console.log("Dados do formulário:", data);
                        handleCloseDialog(); // Fecha o modal após o envio
                    }}
                />
            </CustomDialog>
        </>
    );
};

export default CatalogPage;
