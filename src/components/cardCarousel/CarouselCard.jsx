import React, { useState, useEffect } from 'react';
// import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { getWhereComponentFilter } from "../../services/componentService.js";


import './CarouselCard.css';

function CarouselCard({ CardComponent, filter }) {
    const [listaComponentes, setListaComponentes] = useState([]);

    useEffect(() => {
        getWhereComponentFilter(filter).then((response) => {
            console.log(response.data)
            setListaComponentes(response.data);
        }).catch((error) => {
            console.error('Error fetching components:', error);
        });
    }, []);

    return (
        <>
            <Swiper
                className='custom-swiper'
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={5}
                pagination={{ clickable: true }}
                breakpoints={{
                    0: { slidesPerView: 1, spaceBetween: 10 },
                    600: { slidesPerView: 2, spaceBetween: 20 },
                    900: { slidesPerView: 3, spaceBetween: 30 },
                    1200: { slidesPerView: 4, spaceBetween: 40 },
                    1500: { slidesPerView: 5, spaceBetween: 50 },
                }}
            >
                {listaComponentes?.length === 0 ? (
                    <div style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        padding: '2rem 0'
                    }}>
                        Nenhum componente encontrado.
                    </div>
                ) : (
                    listaComponentes?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <CardComponent props={item} />
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </>
    );
}

export default CarouselCard;