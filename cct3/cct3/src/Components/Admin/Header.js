import React from 'react';
import {useLocation} from 'react-router-dom';
import { IDSHeader, IDSHeaderAvatar, IDSLink, IDSHeaderNav, IDSHeaderNavItem, IDSHeaderMobileMenu, IDSMobileMenuItem } from '@inera/ids-react';


function Header() { 
const location = useLocation(); 
console.log(location); 

  return (
    <IDSHeader className="ids-hide ids-show-inera-admin" brandtext="CertCenter" type="inera-admin">
      <IDSHeaderAvatar username="Förnamn Efternamn">
      <div slot="dropdown">
        <IDSLink color="var(--IDS-COLOR-PRIMARY-40)" block class="ids-mt-5">
          <a href="#">Logga ut</a>
        </IDSLink>
      </div>
    </IDSHeaderAvatar>
      <IDSHeaderNav>
        <IDSHeaderNavItem id='search' link="true" active={location.pathname === '/'}>
          <a href="/">Sök certifikat</a>
        </IDSHeaderNavItem>
        <IDSHeaderNavItem link="true" active={location.pathname === '/create'}>
          <a href="/create">Skapa certifikat</a>
        </IDSHeaderNavItem>
        </IDSHeaderNav>
        <IDSHeaderMobileMenu expanded="">
        <IDSMobileMenuItem>
        <a href="/">Sök certifikat</a>
        </IDSMobileMenuItem>
          <IDSMobileMenuItem>
          <a href="/create">Skapa certifikat</a>
          </IDSMobileMenuItem>
      </IDSHeaderMobileMenu>
    </IDSHeader>
  );
}


export default Header;
