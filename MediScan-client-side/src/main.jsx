import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/Routes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './provider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './provider/ThemeProvider.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <HelmetProvider>
    <React.StrictMode>
      <ThemeProvider>
      <AuthProvider>
      <div className='min-h-screen'>
        <RouterProvider router={router} />
      </div>
      </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  </HelmetProvider>
  </QueryClientProvider>
)
