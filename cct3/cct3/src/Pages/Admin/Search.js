import React from 'react';
import Header from '../../Components/Admin/Header';
import SearchField from '../../Components/Admin/SearchField';
import SearchPageTextField from '../../Components/Admin/SearchPageTextField';

function Search() {
  return (
    <div>
      <header>
        <Header></Header>
      </header>
      <main>
        <SearchPageTextField></SearchPageTextField>
        <SearchField></SearchField>
      </main>
    </div>
  );
}


export default Search;
