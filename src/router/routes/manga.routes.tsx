import type { RouteObject } from 'react-router';
import MangaPage from '../../pages/manga-page/MangaPage';

export const mangaRoutes: RouteObject = {
    path: 'manga',
    children: [
        {
            index: true,
        },
        {
            path: ':id', // Matches /products/:productId
            element: <MangaPage />
        },
        // More nested product routes here
    ],
};