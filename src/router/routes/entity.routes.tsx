import type { RouteObject } from 'react-router';
import { CharacterPage } from '../../pages/character-page';
import { PersonPage } from '../../pages/person-page';

export const entityRoutes: RouteObject = {
    path: '',
    children: [
        {
            path: 'character/:id',
            element: <CharacterPage />,
        },
        {
            path: 'person/:id',
            element: <PersonPage />
        },
    ],
};