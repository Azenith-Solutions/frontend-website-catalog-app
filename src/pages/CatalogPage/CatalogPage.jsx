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
                        { label: 'Resistores', value: '1' },
                        { label: 'Capacitores', value: '2' },
                        { label: 'Indutores', value: '3' },
                        { label: 'Diodos', value: '4' },
                        { label: 'Transistores', value: '5' },
                        { label: 'Tiristores e Retificadores Controlados', value: '6' },
                        { label: 'Optoeletrônicos', value: '7' },
                        { label: 'Eletromecânicos', value: '8' },
                        { label: 'Sensores', value: '9' },
                        { label: 'Circuitos Integrados', value: '10' },
                        { label: 'RF e Comunicação', value: '11' },
                        { label: 'Potência', value: '12' },
                        { label: 'Prototipagem', value: '13' },
                        { label: 'Outros', value: '14' }
                    ]}
                    CardComponent={CardComponent}
                    priceFilterEnabled={true}
                    uriEndPoint={'/products'}
                />
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
    );
};

export default CatalogPage;
