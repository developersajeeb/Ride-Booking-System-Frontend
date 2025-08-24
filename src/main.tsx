import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './routes/index.tsx';
import { Toaster } from 'sonner';
import { ThemeProvider } from './providers/theme.provider.tsx';
import { Provider as ReduxProvider } from "react-redux";
import { store } from './redux/features/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster richColors position="top-right" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>,
)
