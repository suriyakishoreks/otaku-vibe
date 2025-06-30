import type { RouteObject } from 'react-router';
import { animeRoutes } from './anime.routes';
import { AppLayout } from '../../layouts/app-layout';
import { mangaRoutes } from './manga.routes';
import { ErrorPage } from '../../pages/error-page';
import { entityRoutes } from './entity.routes';
import { searchRoutes } from './search.routes';
import React from 'react';

const HomePage = React.lazy(() => import('../../pages/home-page'));

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage isRoot />,
        children: [
            {
                index: true,
                element: <HomePage />,
                errorElement: <ErrorPage />,
            },
            animeRoutes,
            mangaRoutes,
            entityRoutes,
            searchRoutes,
            // 404 route
            {
                path: '*',
                element: <ErrorPage is404 />,
            }
        ],
    }
];

// TODO: lazy loading routes