// src/router/routes/product.routes.ts

import type { RouteObject } from 'react-router';

export const animeRoutes: RouteObject = {
    path: 'products',
    element: <></>, // Layout specific to all product routes
    errorElement: <></>,
    children: [
        {
            index: true, // Matches /products
            element: <></>,
            loader: () => {

            },
        },
        {
            path: ':productId', // Matches /products/:productId
            element: <></>,
            loader: () => {

            },
            action: () => {

            },
        },
        // More nested product routes here
    ],
};