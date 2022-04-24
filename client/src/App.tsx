import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Root } from './pages/Root';
import { Registration } from './pages/Registration';
import { Login } from './pages/Login';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
