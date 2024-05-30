import React from 'react';
import '@inera/ids-design/themes/inera/inera.css'
import '@inera/ids-core/components/header/register';
import {Link} from 'react-router-dom';
import { IDSHeader, IDSHeaderNav, IDSHeaderNavItem, IDSHeaderItem, IDSIconUser } from '@inera/ids-react';


function Header() { 


  return (
    <IDSHeader type="inera-admin" brandtext="CertCenter">
      
      <IDSHeaderItem>
        <IDSIconUser></IDSIconUser>
        <a href="javascript:console.log('Logga in')">Logga in</a>
      </IDSHeaderItem>
      <IDSHeaderNav>
        <IDSHeaderNavItem link active>
          <Link to="/">Sök certifikat</Link>
        </IDSHeaderNavItem>
      </IDSHeaderNav>
    </IDSHeader>
  );
}


export default Header;