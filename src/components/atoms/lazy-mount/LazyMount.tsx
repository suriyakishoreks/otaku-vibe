import React from 'react';
import useIntersectionObserver from '../../../shared/hooks/useIntersectionObserver';

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
    });

    const [hasMounted, setHasMounted] = React.useState(false);

    React.useEffect(() => {
        if (isIntersecting && !hasMounted) {
            setHasMounted(true);
        }
    }, [isIntersecting, hasMounted]);

    return (
        <div ref={wrapperRef} style={!hasMounted ? { height: estimatedHeight } : undefined} className={wrapperClassName}>
            {hasMounted ? children : null}
        </div>
    );
};

export default LazyMount;