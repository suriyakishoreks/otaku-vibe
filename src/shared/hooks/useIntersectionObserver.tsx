import { useRef, useState, useEffect, useMemo, type RefObject } from 'react';

const useIntersectionObserver: (options: IntersectionObserverInit) => [RefObject<null>, boolean] = (options = {}) => {
    const ref = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observerOptions = useMemo(() => options, [options.root, options.rootMargin, options.threshold]);

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, observerOptions);

        observer.observe(currentRef);

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            observer.disconnect();
        };
    }, [observerOptions]);

    return [ref, isIntersecting];
};

export default useIntersectionObserver;