import type { RouteObject } from 'react-router';
import { animeRoutes } from './anime.routes';
import { HomePage } from '../../pages/home-page';
import { AppLayout } from '../../layouts/app-layout';
import { mangaRoutes } from './manga.routes';
import { ErrorPage } from '../../pages/error-page';


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            animeRoutes,
            mangaRoutes,
            // 404 route
            {
                path: '*',
                element: <ErrorPage is404 />,
            }
        ],
    }
];

// TODO: lazy loading routes