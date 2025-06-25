import type { RouteObject } from 'react-router';
import MangaPage from '../../pages/manga-page/MangaPage';
import { MangaLandingPage } from '../../pages/manga-landing-page';

export const mangaRoutes: RouteObject = {
    path: 'manga',
    children: [
        {
            index: true,
            element: <MangaLandingPage />,
        },
        {
            path: ':id',
            element: <MangaPage />
        },
    ],
};