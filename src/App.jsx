import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router';
import { NotificationProvider } from './components/Notification';
import Router from './router/Router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 1,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <NotificationProvider>
          <Router />
        </NotificationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
