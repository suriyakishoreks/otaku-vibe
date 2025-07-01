import React from 'react';
import { useIntersectionObserver } from '../../../shared/hooks/useIntersectionObserver';

interface LazyMountProps {
    children: React.ReactNode;
    rootMargin?: string;
    threshold?: number;
    estimatedHeight: number;
    wrapperClassName?: string;
}

const LazyMount = ({
    children,
    rootMargin = '0px 0px 250px 0px',
    threshold = 0,
    estimatedHeight,
    wrapperClassName,
}: LazyMountProps) => {
    const [wrapperRef, isIntersecting] = useIntersectionObserver({
        root: null,
        rootMargin,
        threshold,
        freezeOnceVisible: true
    });

    return (
        <div ref={wrapperRef} style={!isIntersecting ? { height: estimatedHeight } : undefined} className={wrapperClassName}>
            {isIntersecting ? children : null}
        </div>
    );
};

export default LazyMount;