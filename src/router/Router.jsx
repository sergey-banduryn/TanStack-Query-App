import { Navigate, Route, Routes } from 'react-router';
import { routesConfig } from './routesConfig';
import Layout from '../components/Layout';

function Router() {
  return (
    <Routes>
      <Route element={<Layout />} path='/'>
        {routesConfig.map((route, idx) => (
          <Route
            element={
              route.redirectTo ? (
                <Navigate replace to={route.redirectTo} />
              ) : (
                <route.component />
              )
            }
            index={route.index}
            key={route.path || idx}
            path={route.path}
          />
        ))}
      </Route>
    </Routes>
  );
}

export default Router;
