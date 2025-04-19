import React, { useState } from 'react';
import components from "../../db/component.json";
// import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './CarouselCard.css';

function CarouselCard({CardComponent, filter, uriEndPoint}) {
    const [listaComponentes, setListaComponentes] = useState(components.slice(0, 10));

    // Requisição no banco para pegar os 10 primeiros items de um filtro
    /** 
    useEffect(() => {
            const fetchProdutos = async () => {
                  const response = await axios.get(`{uriEndPoint}?limit=10&filter=${filter}`);
                  setListaComponentes(response.data.produtos);
        };
    
        fetchProdutos();
      }, []);  
    */
    return (
        <>
            <Swiper
                className='custom-swiper'
                modules={[Navigation, Pagination]} // Ativa os módulos de navegação e paginação
                spaceBetween={50} // Espaçamento entre os slides
                slidesPerView={5} // Número de slides visíveis por vez
                pagination={{ clickable: true }} // Ativa a paginação clicável
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    900: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1500: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
            >
                {listaComponentes.map((item, index) => (
                    <SwiperSlide key={index}>
                        <CardComponent props={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default CarouselCard;