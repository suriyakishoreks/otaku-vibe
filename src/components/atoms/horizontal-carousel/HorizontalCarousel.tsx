import React, { useRef } from "react";
import styles from './HorizontalCarousel.module.scss';
import { Label } from "../label";

interface HorizontalCarouselProps {
    children: React.ReactNode[];
}

// TODO: Implement progressive carousel with window size, etc
function HorizontalCarousel({ children }: HorizontalCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const itemRef = useRef<HTMLDivElement>(null);


    // TODO: fix this logic adding item item to equation
    const scroll = (direction: "left" | "right") => {
        if (containerRef.current && itemRef.current) {
            const container = containerRef.current;
            const { clientWidth, scrollLeft } = container;
            const itemWidth = itemRef.current.offsetWidth;

            if (direction === "right") {
                const maxVisible = Math.floor(clientWidth / itemWidth);
                const remainder = scrollLeft % itemWidth;
                let scrollAmount = 0;
                if (remainder === 0) {
                    scrollAmount = itemWidth * maxVisible;
                } else {
                    scrollAmount = itemWidth * maxVisible - remainder;
                }
                container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                });
            } else {
                const maxVisible = Math.floor(clientWidth / itemWidth);
                const remainder = scrollLeft % itemWidth;
                let scrollAmount = 0;
                if (remainder === 0) {
                    scrollAmount = -itemWidth * maxVisible;
                } else {
                    scrollAmount = -itemWidth * maxVisible - remainder;
                }
                container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                });
            }
        }
    };

    return (
        <div className={styles.carousel}>
            <div className={styles.carousel__header}>
                <div>
                    <Label as='h3' font="typo-primary-l-medium" className={styles.carousel__heading} >Recommended for you</Label>
                </div>
                <div>
                    <button
                        className={styles['carousel__header-button']}
                        onClick={() => scroll("left")}
                    >
                        &#8592;
                    </button>
                    <button
                        className={styles['carousel__header-button']}
                        onClick={() => scroll("right")}
                    >
                        &#8594;
                    </button>
                </div>
            </div>
            <div
                ref={containerRef}
                className={styles['carousel__scroll-container']}
            >
                {children.map((child, idx) => (
                    <div
                        ref={itemRef}
                        key={idx}
                        className={styles['carousel__item-container']}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HorizontalCarousel;