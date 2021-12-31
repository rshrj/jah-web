import { Outlet } from 'react-router-dom';

import NavBar from '../../components/NavBar';

const PublicPage = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default PublicPage;
