<<<<<<< HEAD

import './App.css';
import {BrowserRouter, Route, Routes}  from "react-router-dom"
import User from './componets/User';
=======
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpListing from './EmpListing';
import EmpCreate from './EmpCreate';
import EmpDetail from './EmpDetail';
import EmpEdit from './EmpEdit';
>>>>>>> 17b1234 (updetd code)

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
    
    <h1>Empolye data crund</h1>
    <BrowserRouter>
      <Routes>

         <Route path="/" element={<User/>}/>

      </Routes>
    </BrowserRouter>

    </div>
  );
=======
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmpListing />}></Route>
          <Route path='/employee/create' element={<EmpCreate />}></Route>

          <Route path='/employee/detail/:empid' element={<EmpDetail />}></Route>
          <Route path='/employee/edit/:empid' element={<EmpEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

>>>>>>> 17b1234 (updetd code)
}

export default App;
