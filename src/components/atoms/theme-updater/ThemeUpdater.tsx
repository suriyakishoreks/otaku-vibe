import { useEffect } from 'react';
import { useAppSelector } from '../../../store';

function ThemeUpdater() {
    const currentTheme = useAppSelector((state) => state.persistedAppContext.theme);

    useEffect(() => {
        const rootElement = document.body;

        if (currentTheme === 'light') {
            rootElement.classList.toggle('light-theme', true);
        } else {
            rootElement.classList.toggle('light-theme', false);
        }

    }, [currentTheme]);

    return null;
}

export default ThemeUpdater;