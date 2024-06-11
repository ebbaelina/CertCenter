import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import '@inera/ids-design/themes/inera/inera.css';
import '@inera/ids-design/themes/inera-admin/inera-admin.css'
import '@inera/ids-design/components/table/table.css';
import '@inera/ids-design/components/dialog/dialog.css';
import '@inera/ids-design/components/form/select/select.css';
import '@inera/ids-design/components/form/input/input.css'
import '@inera/ids-design/components/button/button.css';
import '@inera/ids-design/components/expandable/expandable.css';
import '@inera/ids-core/components/header/register';
import '@inera/ids-design/components/link/link.css';
import Search from './Pages/Admin/Search';
import Create from './Pages/Admin/Create';
import SearchCommon from './Pages/Common/SearchCommon';



function App() {

const [loggedin, setLoggedIn] = useState(true); 

  return (
    <Router>
        <Routes>
          <Route exact path='/' element={loggedin? <Search/> : <Navigate to= '/common'></Navigate>} />
          <Route exact path='/create' element={ loggedin? <Create/> : <Navigate to = '/common'></Navigate>} />
          <Route exact path= '/common' element={!loggedin? <SearchCommon/> : <Navigate to='/'></Navigate>}/>
        </Routes>
    </Router>
  );
}

export default App;
