import { Navigate, Route, Routes } from 'react-router';
import Layout from '../components/Layout';
import { routesConfig } from './routesConfig';

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {routesConfig.map((route, idx) => (
          <Route
            key={route.path || idx}
            index={route.index}
            path={route.path}
            element={
              route.redirectTo ? (
                <Navigate to={route.redirectTo} replace />
              ) : (
                <route.component />
              )
            }
          />
        ))}
      </Route>
    </Routes>
  );
}

export default Router;
