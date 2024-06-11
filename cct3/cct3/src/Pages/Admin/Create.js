import React from 'react';
import Header from '../../Components/Admin/Header';
import CreateField from '../../Components/Admin/CreateField';
import CreatePageTextField from '../../Components/Admin/CreatePageTextField';
import Footer from '../../Components/Common/Footer';

function Create() {
  return (
    <div className='page-container'>
      <header>
        <Header></Header>
        </header>
      <main className='content-wrap'>
        <CreatePageTextField></CreatePageTextField>
        <CreateField></CreateField>
      </main>
      <Footer></Footer>
        </div>
  );
}


export default Create;
