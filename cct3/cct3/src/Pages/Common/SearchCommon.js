import React from 'react';
import SearchFieldCommon from '../../Components/Common/SearchFieldCommon';
import HeaderCommon from '../../Components/Common/HeaderCommon';
import SearchPageTextField from '../../Components/Admin/SearchPageTextField';
import Footer from '../../Components/Common/Footer';

function SearchCommon() {
  return (
    <div className='page-container'>
   <header>
    <HeaderCommon></HeaderCommon>
    </header>
    <main className='content-wrap'>
   <SearchPageTextField></SearchPageTextField>
   <SearchFieldCommon></SearchFieldCommon>
   </main>
   <Footer></Footer>
   </div>
  );
}


export default SearchCommon;
