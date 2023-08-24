import '@styles/globals.scss';

import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './layout/Header/index';
import { QueryClientProvider } from 'react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import queryClient from '@/api/queryClient';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Header />
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
