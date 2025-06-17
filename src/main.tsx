import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import { store } from './store';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router';
import router from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </StrictMode>,
);
