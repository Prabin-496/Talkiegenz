import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './slider.css'; // Import the CSS file here

// Import your images
import image1 from '../src/OIP.jpeg';
import image2 from '../src/person2AVT.jpeg';
// Import additional images as needed

const Slider = () => {
  const images = [image1, image2, /* Add more image imports */];

  return (
    <div className="container">
      <div className="slider-wrapper">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="swiper swiper-initialized swiper-horizontal tranding-slider"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="tranding-slide">
              <div className="tranding-slide-img">
                <img src={image} alt={`Image ${index + 1}`} />
              </div>
            </SwiperSlide>
          ))}
          <div className="tranding-slider-control">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;