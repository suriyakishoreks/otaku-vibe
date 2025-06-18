import type { RouteObject } from 'react-router';
import { animeRoutes } from './anime.routes';
import { HomePage } from '../../pages/homePage';
import { AppLayout } from '../../layouts/appLayout';


export const routes: RouteObject[] = [
    {
        path: '/anime-list-app/',
        element: <AppLayout />,
        errorElement: <></>,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            // Include your feature route objects here
            animeRoutes
            // adminRoutes,
            // ... any other top-level routes that fit within MainLayout
        ],
    },
    {
        // Catch-all for any undefined paths, typically a 404 page
        path: '*',
        element: <></>,
        errorElement: <></>, // 404 page also uses the global error boundary
    },
];