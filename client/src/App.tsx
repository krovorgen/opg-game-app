import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { Root } from './pages/Root';
import { Registration } from './pages/Registration';
import { Login } from './pages/Login';
import { AppRoutes } from './helpers/routes';
import { AdminTools } from './components/AdminTools';
import { useAppSelector } from './redux/hooks';
import { initializedTC } from './redux/reducer/userReducer';
import { GlobalLoader } from './components/GlobalLoader';

export const App = () => {
  const isInitializedApp = useAppSelector((state) => state.app.isInitializedApp);
  const userRole = useAppSelector((state) => state.user.user?.role);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializedTC());
  }, [dispatch]);

  if (!isInitializedApp) return <GlobalLoader />;

  return (
    <>
      <Routes>
        <Route path={AppRoutes.Root} element={<Root />} />
        <Route path={AppRoutes.Login} element={<Login />} />
        <Route path={AppRoutes.Registration} element={<Registration />} />
      </Routes>
      {userRole === 'ADMIN' ? <AdminTools /> : null}
    </>
  );
};
