import React, { useEffect } from 'react';

const ScrollRestorationDisabler: React.FC = () => {

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            const prev = window.history.scrollRestoration;
            window.history.scrollRestoration = 'manual';
            return () => {
                window.history.scrollRestoration = prev;
            };
        }
    }, []);

    return null;
};

export default ScrollRestorationDisabler;