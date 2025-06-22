import type { RouteObject } from 'react-router';
import { AnimePage } from '../../pages/anime-page';

export const animeRoutes: RouteObject = {
    path: 'anime',
    children: [
        {
            index: true, // Matches /products
            element: <></>,
        },
        {
            path: ':id', // Matches /products/:productId
            element: <AnimePage />,
        },
        // More nested product routes here
    ],
};