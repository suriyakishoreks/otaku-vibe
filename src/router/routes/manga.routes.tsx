import type { RouteObject } from 'react-router';
import MangaPage from '../../pages/manga-page/MangaPage';
import { MangaLandingPage } from '../../pages/manga-landing-page';
import { ErrorPage } from '../../pages/error-page';

export const mangaRoutes: RouteObject = {
    path: 'manga',
    errorElement: <ErrorPage />,
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