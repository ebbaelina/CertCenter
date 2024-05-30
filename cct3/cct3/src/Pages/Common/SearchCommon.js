import React from 'react';
import SearchFieldCommon from '../../Components/Common/SearchFieldCommon';
import HeaderCommon from '../../Components/Common/HeaderCommon';
import SearchPageTextField from '../../Components/Admin/SearchPageTextField';

function SearchCommon() {
  return (
    <div>
   <header>
    <HeaderCommon></HeaderCommon>
    </header>
    <main>
   <SearchPageTextField></SearchPageTextField>
   <SearchFieldCommon></SearchFieldCommon>
   </main>
   </div>
  );
}


export default SearchCommon;
