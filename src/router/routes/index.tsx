import type { RouteObject } from 'react-router';
import { animeRoutes } from './anime.routes';
import { HomePage } from '../../pages/home-page';
import { AppLayout } from '../../layouts/app-layout';


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
            // Include your feature route objects here
            animeRoutes
            // adminRoutes,
            // ... any other top-level routes that fit within MainLayout
        ],
    },
    {
        // Catch-all for any undefined paths, typically a 404 page
        path: '*',
        element: <AppLayout />,
        errorElement: <></>, // 404 page also uses the global error boundary
    },
];