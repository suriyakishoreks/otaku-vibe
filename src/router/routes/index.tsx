import type { RouteObject } from 'react-router';

// Import your feature-specific route definitions
import { animeRoutes } from './anime.routes';
// Define the root of your route tree
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <></>, // Your main app layout
        errorElement: <></>, // Global error boundary for routes within MainLayout
        children: [
            {
                index: true, // Matches /
                element: <></>,
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