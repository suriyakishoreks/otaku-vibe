import type { RouteObject } from 'react-router';
import { AnimePage } from '../../pages/anime-page';
import { AnimeLandingPage } from '../../pages/anime-landing-page';
import { ErrorPage } from '../../pages/error-page';

export const animeRoutes: RouteObject = {
    path: 'anime',
    errorElement: <ErrorPage />,
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