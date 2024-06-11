import React from 'react';
import Header from '../../Components/Admin/Header';
import SearchField from '../../Components/Admin/SearchField';
import SearchPageTextField from '../../Components/Admin/SearchPageTextField';
import Footer from '../../Components/Common/Footer';

function Search() {
  return (
    <div className='page-container'>
      <header>
        <Header></Header>
      </header>
      <main className='content-wrap'>
        <SearchPageTextField></SearchPageTextField>
        <SearchField></SearchField>
      </main>
      <Footer></Footer>
    </div>
  )
}


export default Search;
