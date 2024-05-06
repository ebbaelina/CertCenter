import React, { useState } from 'react';
import '@inera/ids-design/themes/inera/inera.css'
import '@inera/ids-core/components/header/register';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Header() {
  const location = useLocation();
  console.log(location);


  return (
    <ids-header type="inera-admin" brandtext="CertCenter">
      <ids-header-nav>
        <ids-header-nav-item active={location.pathname === '/'} link="">
          <Link to="/">Sök certifikat</Link>
        </ids-header-nav-item>
        <ids-header-nav-item active={location.pathname === '/create'} link="">
          <Link to="/create">Skapa certifikat</Link>
        </ids-header-nav-item>
      </ids-header-nav>
    </ids-header>
  );
}


export default Header;
