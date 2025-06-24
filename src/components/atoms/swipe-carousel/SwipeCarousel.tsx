import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Autoplay } from 'swiper/modules';

// @ts-expect-error: swiper/scss may not have TypeScript types
import 'swiper/scss';
// @ts-expect-error: swiper/scss/free-mode may not have TypeScript types
import 'swiper/scss/free-mode';
// @ts-expect-error: swiper/scss/autoplay may not have TypeScript types
import 'swiper/scss/autoplay';

interface SwipeCarouselProps {
    children: React.ReactNode[];
}

function SwipeCarousel(props: SwipeCarouselProps) {
    return (
        <Swiper
            slidesPerView={'auto'}
            centeredSlides={true}
            spaceBetween={30}
            mousewheel={{
                enabled: true,
                forceToAxis: true
            }}
            // loop={true}
            // autoplay={{
            //     pauseOnMouseEnter: true,
            //     delay: 2000,

            // }}
            style={{
                padding: '20px 0px',
            }}
            modules={[FreeMode, Mousewheel]}
        >
            {props.children.map((child) => {
                return <SwiperSlide style={{ width: 'auto' }}>
                    {child}
                </SwiperSlide>;
            })}
        </Swiper>
    );
}

export default SwipeCarousel;