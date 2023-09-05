import '@styles/globals.scss';

import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CaptureProvider } from './components/Context/captureContext.jsx';
import { Header } from '@/layout/Header';
import { QueryClientProvider } from 'react-query';
import ReactDOM from 'react-dom/client';
import queryClient from '@/api/queryClient';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <CaptureProvider>
        <Header />
        <App />
      </CaptureProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
