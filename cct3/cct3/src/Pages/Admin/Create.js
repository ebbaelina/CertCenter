import React from 'react';
import Header from '../../Components/Admin/Header';
import CreateField from '../../Components/Admin/CreateField';
import CreatePageTextField from '../../Components/Admin/CreatePageTextField';

function Create() {
  return (
    <div>
      <header><Header></Header></header>
      <main>
        <CreatePageTextField></CreatePageTextField>
        <CreateField></CreateField>
      </main>
    </div>
  );
}


export default Create;
