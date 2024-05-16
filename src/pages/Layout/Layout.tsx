import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header/Header';
import './Layout.css';

interface LayoutProps { }

const Layout: FC<LayoutProps> = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
export default Layout;
