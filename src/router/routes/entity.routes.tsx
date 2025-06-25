import type { RouteObject } from 'react-router';

export const entityRoutes: RouteObject = {
    path: '',
    children: [
        {
            path: 'character/:id',
            element: <></>,
        },
        {
            path: 'person/:id',
            element: <></>
        },
    ],
};