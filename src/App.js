
import './App.css';
import {BrowserRouter, Route, Routes}  from "react-router-dom"
import User from './componets/User';

function App() {
  return (
    <div className="App">
    
    <h1>Empolye data crund</h1>
    <BrowserRouter>
      <Routes>

         <Route path="/" element={<User/>}/>

      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
