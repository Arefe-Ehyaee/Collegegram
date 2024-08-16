import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
interface Image {
    src: string;
    alt: string;
  }

interface ImageCarouselProps {
    images: Image[];
  }

  const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    return (
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className=" md:w-[520px] md:h-[376px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.src} alt={image.alt} className="w-full h-auto object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };
  
  export default ImageCarousel;
