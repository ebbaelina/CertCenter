import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import '@inera/ids-design/themes/inera/inera.css';
import '@inera/ids-design/themes/inera-admin/inera-admin.css'
import '@inera/ids-design/components/table/table.css';
import '@inera/ids-design/components/dialog/dialog.css';
import '@inera/ids-design/components/form/select/select.css';
import '@inera/ids-design/components/form/input/input.css';
import Search from './Pages/Search';
import Create from './Pages/Create';

function App() {
  return (
    <Router>
      <div className="ids">
        <Routes>
          <Route exact path='/' element={<Search/>} />
          <Route exact path='/create' element={<Create/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
