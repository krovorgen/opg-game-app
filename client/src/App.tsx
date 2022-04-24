import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Root } from './pages/Root';
import { Registration } from './pages/Registration';
import { Login } from './pages/Login';
import { AppRoutes } from './helpers/routes';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.Root} element={<Root />} />
          <Route path={AppRoutes.Login} element={<Login />} />
          <Route path={AppRoutes.Registration} element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
