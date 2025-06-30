import type { RouteObject } from 'react-router';
import { ErrorPage } from '../../pages/error-page';
import React from 'react';

const AnimePage = React.lazy(() => import('../../pages/anime-page'));
const AnimeLandingPage = React.lazy(() => import('../../pages/anime-landing-page'));



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