'use client';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import ProductCard from "../ProductCard";

interface ProductSliderProps {
  products: any[];
}

export default function ProductSlider({
  products,
}: ProductSliderProps) {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1.15}
      slidesPerGroup={1}
      grabCursor={true}
      freeMode={false}
      centeredSlides={false}
      loop={false}
      speed={600}
      breakpoints={{
        640: {
          slidesPerView: 2.2,
        },
        768: {
          slidesPerView: 3.2,
        },
        1024: {
          slidesPerView: 4.2,
        },
        1280: {
          slidesPerView: 5.2,
        },
      }}
    >
      {products.map((product: any) => (
        <SwiperSlide key={product._id.toString()}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}