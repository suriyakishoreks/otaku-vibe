import type { RouteObject } from 'react-router';
import { AnimePage } from '../../pages/anime-page';
import { AnimeLandingPage } from '../../pages/anime-landing-page';

export const animeRoutes: RouteObject = {
    path: 'anime',
    children: [
        {
            index: true,
            element: <AnimeLandingPage />,
        },
        {
            path: ':id',
            element: <AnimePage />,
        },
    ],
};