import React from 'react';
import { Outlet } from 'react-router-dom';
import MainPage from '../pages/main-page';

const Layout = () => {
  return (
    <div>
      {/* Always show the MainPage */}
      <MainPage />

      {/* This will render the matched route component */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;