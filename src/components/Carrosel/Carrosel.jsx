import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Regulador from "../../assets/images/ReguladorTensaoBgRed.png";
import MofSet from "../../assets/images/MofsetBtnYellow.png";
import OperationAmplifiers from "../../assets/images/OperationAmplifiersBtnYellow.png";

import './Carrosel.css'

const images = [
  Regulador,
  MofSet,
  OperationAmplifiers,
];

const Carrosel = () => {
  return (
    <div className="carrosel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        loop
        spaceBetween={50}
        slidesPerView={1}
        style={{ height: "60vh" }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                height: "100%",
                width: "100%",
                overflow: "hidden"
              }}
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carrosel;
