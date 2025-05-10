import React from 'react';
import NavBarCatalog from '../../components/navBar/NavBarCatalog';
import Carrosel from '../../components/Carrosel/Carrosel';
import PaginatedFilterSection from '../../components/pagination/PaginatedFilterSection';
import CardComponent from '../../components/cards/CardComponent';
import CarouselCard from '../../components/cardCarousel/CarouselCard';
import Footer from '../../components/footer/Footer';

import { Container } from '@mui/material';

import { ShoppingBagIcon } from '@heroicons/react/solid';
import { FireIcon } from '@heroicons/react/solid';
import { StarIcon } from '@heroicons/react/solid';

import background from './Styles/assets/background abstrato.png';
import './Styles/CatalogPage.css';

const CatalogPage = () => {
    const sections = [
        { title: 'Componentes', anchor: 'componentes' },
        { title: 'Mais Vendidos', anchor: 'mais-vendidos' },
        { title: 'Promoções', anchor: 'promocoes' },
        { title: 'Novidades', anchor: 'novidades' },
    ];
    return (
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
            <div id='componentes' style={{ marginTop: '5vh' }} className='section'>
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
                <div id='promocoes' className="section-Promocoes section">
                    <div className="section-title">
                        <span className="icon">
                            <FireIcon className="w-4 h-4 text-[#5c1a1b]" />
                        </span>
                        <span className="text">Promoções</span>
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
    );
};

export default CatalogPage;
