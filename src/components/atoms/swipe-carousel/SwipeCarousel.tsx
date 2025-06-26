import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import { FreeMode, Autoplay } from 'swiper/modules';
import type { SwiperModule } from "swiper/types";
import React from 'react';
// @ts-expect-error: swiper/scss may not have TypeScript types
import 'swiper/scss';
// @ts-expect-error: swiper/scss/free-mode may not have TypeScript types
import 'swiper/scss/free-mode';
// @ts-expect-error: swiper/scss/autoplay may not have TypeScript types
import 'swiper/scss/autoplay';
import styles from './SwipeCarousel.module.scss';

interface SwipeCarouselProps {
    children: React.ReactNode[];
    type?: SwipeCarouselType;
    onSwiper?: (swiper: SwiperClass) => void;
    onSlideChange?: (swiper: SwiperClass) => void;
}

export type SwipeCarouselType = 'centered' | 'scroll';

function SwipeCarousel({ onSwiper, onSlideChange, type = 'scroll', children }: SwipeCarouselProps) {

    const modules: SwiperModule[] = type === 'centered' ? [Autoplay] : [FreeMode];

    return (
        <Swiper
            onSwiper={onSwiper}
            onSlideChange={onSlideChange}
            slidesPerView={'auto'}
            slidesPerGroupAuto={type === 'scroll'}
            freeMode={type === 'scroll'}
            centeredSlides={type === 'centered'}
            loop={type === 'centered'}
            spaceBetween={24}
            autoplay={type === 'centered' ? {
                pauseOnMouseEnter: true,
                delay: 3000,
            } : undefined}
            className={styles.swiper}
            modules={modules}
        >

            {children.map((child) => {
                return <SwiperSlide className={styles.swiper__slide}>
                    {child}
                </SwiperSlide>;
            })}
        </Swiper>
    );
}

export default SwipeCarousel;