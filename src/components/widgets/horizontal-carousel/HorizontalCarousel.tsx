import { skipToken, type TypedUseQuery } from "@reduxjs/toolkit/query/react";
import { SwipeCarousel, type SwipeCarouselType } from "../../atoms/swipe-carousel";
import { ImageCard, ImageCardLoading } from "../../atoms/image-card";
import { Label } from "../../atoms/label";
import styles from "./HorizontalCarousel.module.scss";
import React from "react";
import { type SwiperClass } from "swiper/react";
import LeftChevron from "../../atoms/ic/LeftChevron";
import RightChevron from "../../atoms/ic/RightChevron";
import classNames from "classnames";
import { MediaDetailCard, MediaDetailCardLoading } from "../../atoms/media-detail-card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UseQuery = TypedUseQuery<any, any, any>;

type ExtractResultAndArgFromTypedUseQuery<THook extends UseQuery> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THook extends TypedUseQuery<infer R, infer A, any> ? { result: R, arg: A; } : never;

type ExtractDataTypeFromHook<THook extends UseQuery> =
    ExtractResultAndArgFromTypedUseQuery<THook>['result'];

type ExtractArgTypeFromHook<THook extends UseQuery> =
    ExtractResultAndArgFromTypedUseQuery<THook>['arg'];

interface MediaDetailCardCarouselData {
    key: string,
    title: string;
    imageUrl: string;
    navigateTo?: string;
    alt: string;
    summary?: string;
    ratings?: string;
    favorites?: string;
    status?: string;
    genres?: string[];
}

interface ImageCardCarouselData {
    key: string,
    title: string;
    imageUrl: string;
    navigateTo?: string;
    alt: string;
    ratings?: string;
    favorites?: string;
}

type CardType = 'image' | 'media-detail';

interface HorizontalCarouselProps<TQueryHook extends UseQuery, TCardType extends CardType> {
    heading: string;
    type?: SwipeCarouselType;
    cardType?: TCardType;
    useQueryHook: TQueryHook;
    options: ExtractArgTypeFromHook<TQueryHook> | typeof skipToken;
    adapter: (
        data: ExtractDataTypeFromHook<TQueryHook>
    ) => TCardType extends 'image' ? ImageCardCarouselData[] : MediaDetailCardCarouselData[];
}

function HorizontalCarousel<TQueryHook extends UseQuery, TCardType extends CardType = 'image'>({
    heading,
    type,
    cardType,
    useQueryHook,
    options,
    adapter,
}: HorizontalCarouselProps<TQueryHook, TCardType>) {
    const swiperRef = React.useRef<SwiperClass>(null);
    const [isBeginning, setIsBeginning] = React.useState(true);
    const [isEnd, setIsEnd] = React.useState(false);
    const { data } = useQueryHook(options);

    const adaptedData = data ? adapter(data) : undefined;

    const getCarouselInstance = (swiper: SwiperClass) => {
        swiperRef.current = swiper;
    };

    const handleCarouselMove = (swiper: SwiperClass) => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const getContent = React.useCallback((): React.ReactNode[] => {
        switch (cardType) {
            case 'media-detail': {
                if (!adaptedData) {
                    return Array.from({ length: 15 }, () => ({})).map((_, idx) => <MediaDetailCardLoading key={idx} />);
                }

                return (adaptedData as MediaDetailCardCarouselData[]).map((data) => (
                    <MediaDetailCard
                        key={data.key}
                        navigateTo={data.navigateTo}
                        src={data.imageUrl}
                        alt={data.title}
                        title={data.title}
                        ratings={data.ratings}
                        favorites={data.favorites}
                        summary={data.summary}
                        status={data.status}
                        genres={data.genres}
                    />
                ));
            }
            case 'image':
            default: {
                if (!adaptedData) {
                    return Array.from({ length: 15 }, () => ({})).map((_, idx) => <ImageCardLoading key={idx} />);
                }

                return (adaptedData as ImageCardCarouselData[]).map((data) => (
                    <ImageCard
                        key={data.key}
                        navigateTo={data.navigateTo}
                        src={data.imageUrl}
                        alt={data.title}
                        title={data.title}
                        ratings={data.ratings}
                        favorites={data.favorites}
                    />
                ));
            }
        }
    }, [cardType, adaptedData]);

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
            <SwipeCarousel type={type} onSwiper={getCarouselInstance} onSlideChange={handleCarouselMove}>{getContent()}</SwipeCarousel>
        </div>
    );
}

export default HorizontalCarousel;