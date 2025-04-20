import React from 'react';
import NavBarCatalog from '../../components/navBar/NavBarCatalog';
import Carrosel from '../../components/Carrosel/Carrosel';
import PaginatedFilterSection from '../../components/pagination/PaginatedFilterSection';
import CardComponent from '../../components/cards/CardComponent';
import CarouselCard from '../../components/cardCarousel/CarouselCard';
import Footer from '../../components/footer/Footer';

import { ShoppingBagIcon } from '@heroicons/react/solid';
import { FireIcon } from '@heroicons/react/solid';
import { StarIcon } from '@heroicons/react/solid';

import background from './Styles/assets/background abstrato.png';
import './Styles/CatalogPage.css';

const CatalogPage = () => {
    return (
        <div
            className="catalog-background"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: '200vh',
            }}
        >
            <NavBarCatalog
                menuItems={['Componentes', 'Mais vendidos', 'Promoções', 'Novidades']}
                redirectButtonName={'Componentes'}
            />
            <Carrosel />
            <div style={{ marginTop: '5vh' }}>
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
            <div className='Section-Mais-Vendidos'>
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
            <div className="section-Promocoes">
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
            <div className='Section-Novidades'>
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
