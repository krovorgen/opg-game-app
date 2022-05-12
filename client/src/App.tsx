import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { AppRoutes } from './helpers/routes';
import { AdminTools } from './components/AdminTools';
import { useAppSelector } from './redux/hooks';
import { initializedTC } from './redux/reducer/authReducer';
import { GlobalLoader } from './components/GlobalLoader';
import { PasswordRecovery } from './pages/PasswordRecovery';
import { Root } from './pages/Root';
import { Registration } from './pages/Registration';
import { Login } from './pages/Login';
import { SetNewPassword } from './pages/SetNewPassword';

export const App = () => {
  const isInitializedApp = useAppSelector((state) => state.app.isInitializedApp);
  const userRole = useAppSelector((state) => state.auth.user?.role);
  const token = useAppSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializedTC());
  }, [dispatch, token]);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  if (!isInitializedApp) return <GlobalLoader />;

  return (
    <>
      <Routes>
        <Route path={AppRoutes.Root} element={<Root />} />
        <Route path={AppRoutes.Login} element={<Login />} />
        <Route path={AppRoutes.Registration} element={<Registration />} />
        <Route path={AppRoutes.PasswordRecovery} element={<PasswordRecovery />} />
        <Route path={AppRoutes.SetNewPassword} element={<SetNewPassword />} />
      </Routes>
      {true || userRole === 'ADMIN' ? <AdminTools /> : null}
    </>
  );
};
