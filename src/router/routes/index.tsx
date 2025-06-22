import type { RouteObject } from 'react-router';
import { animeRoutes } from './anime.routes';
import { HomePage } from '../../pages/home-page';
import { AppLayout } from '../../layouts/app-layout';
import { mangaRoutes } from './manga.routes';


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <></>,
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
                element: <h1 style={{ color: 'red' }}>ERROR 404</h1>,
            }
        ],
    }
];