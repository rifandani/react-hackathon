import Navbar from '@shared/components/smart/Navbar/Navbar.organism';
import { Outlet } from 'react-router-dom';

export default function NavbarWrapper() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}
