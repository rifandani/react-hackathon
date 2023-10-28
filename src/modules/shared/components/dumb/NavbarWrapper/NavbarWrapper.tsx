import Navbar from '@shared/components/smart/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function NavbarWrapper() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}
