import { skipToken, type TypedUseQuery } from "@reduxjs/toolkit/query/react";
import { SwipeCarousel, type SwipeCarouselType } from "../../atoms/swipe-carousel";
import { ImageCard } from "../../atoms/image-card";
import { Label } from "../../atoms/label";
import styles from "./HorizontalCarousel.module.scss";
import React from "react";
import { type SwiperClass } from "swiper/react";
import LeftChevron from "../../atoms/icons/LeftChevron";
import RightChevron from "../../atoms/icons/RightChevron";
import classNames from "classnames";
import { MediaDetailCard } from "../../atoms/media-detail-card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseQuery = TypedUseQuery<any, any, any>;

type ExtractResultAndArgFromTypedUseQuery<THook extends UseQuery> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THook extends TypedUseQuery<infer R, infer A, any> ? { result: R, arg: A; } : never;

type ExtractDataTypeFromHook<THook extends UseQuery> =
    ExtractResultAndArgFromTypedUseQuery<THook>['result'];

type ExtractArgTypeFromHook<THook extends UseQuery> =
    ExtractResultAndArgFromTypedUseQuery<THook>['arg'];

interface HorizontalCarouselData {
    title: string;
    imageUrl: string;
    navigateTo?: string;
    alt?: string;
    summary?: string;
}

interface HorizontalCarouselProps<TQueryHook extends UseQuery> {
    heading: string;
    type?: SwipeCarouselType;
    useQueryHook: TQueryHook;
    options: ExtractArgTypeFromHook<TQueryHook> | typeof skipToken;
    adapter: (data: ExtractDataTypeFromHook<TQueryHook> | undefined) => HorizontalCarouselData[];
}

function HorizontalCarousel<TQueryHook extends UseQuery>({
    heading,
    type,
    useQueryHook,
    options,
    adapter,
}: HorizontalCarouselProps<TQueryHook>) {
    const swiperRef = React.useRef<SwiperClass>(null);
    const [isBeginning, setIsBeginning] = React.useState(true);
    const [isEnd, setIsEnd] = React.useState(false);
    const { data, isLoading } = useQueryHook(options);

    const adaptedData = data ? adapter(data) : [];

    const getCarouselInstance = (swiper: SwiperClass) => {
        swiperRef.current = swiper;
    };

    const handleCarouselMove = (swiper: SwiperClass) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    // if (isLoading) {
    //     return <div style={{ height: 300 }}>Loading...</div>; // You can replace this with a loading spinner or skeleton
    // }

    return (
        <div className={styles['horizontal-carousel']}>
            <div className={styles['horizontal-carousel__header']}>
                {<Label as='h3' font="typo-primary-l-semibold" className={styles['horizontal-carousel__heading']}>{heading ?? ''}</Label>}
                <div className={styles['horizontal-carousel__nav']}>
                    <button
                        className={classNames({ [styles['horizontal-carousel__nav-button']]: true, [styles['horizontal-carousel__nav-button-left']]: true })}
                        disabled={isBeginning}
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <LeftChevron size={12} color="s-color-fg-primary" />
                    </button>

                    <button
                        className={classNames({ [styles['horizontal-carousel__nav-button']]: true, [styles['horizontal-carousel__nav-button-right']]: true })}
                        disabled={isEnd}
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <RightChevron size={12} color="s-color-fg-primary" />
                    </button>
                </div>
            </div>
            <SwipeCarousel type={type} onSwiper={getCarouselInstance} onSlideChange={handleCarouselMove}>
                {adaptedData.map((data) => {
                    return (
                        type === 'centered' ? (
                            <MediaDetailCard
                                navigateTo={data.navigateTo}
                                src={data.imageUrl}
                                alt={data.title}
                                title={data.title}
                            />
                        ) : (
                            <ImageCard
                                navigateTo={data.navigateTo}
                                src={data.imageUrl}
                                alt={data.title}
                                title={data.title}
                            />
                        )
                    );
                }
                )}
            </SwipeCarousel>
        </div>
    );
}

export default HorizontalCarousel;