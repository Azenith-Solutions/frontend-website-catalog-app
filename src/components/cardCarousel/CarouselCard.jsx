import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import services data
import servicesData from "../../db/services.json";

import './CarouselCard.css';

function CarouselCard({ CardComponent, filter, uriEndPoint, currentServiceId }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (filter === 'services') {
            const filteredServices = currentServiceId 
                ? servicesData.services.filter(service => service.id !== parseInt(currentServiceId))
                : servicesData.services;
                
            setItems(filteredServices);
        } else {
            import("../../services/componentService.js").then(module => {
                const { getWhereComponentFilter } = module;
                getWhereComponentFilter(filter).then((response) => {
                    setItems(response.data);
                }).catch((error) => {
                    console.error('Error fetching components:', error);
                });
            });
        }
    }, [filter, currentServiceId]);

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
                {items?.length === 0 ? (
                    <div style={{
                        width: '100%',
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        padding: '2rem 0'
                    }}>
                        Nenhum item encontrado.
                    </div>
                ) : (
                    items?.map((item, index) => (
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