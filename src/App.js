import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CodesAmi from './Pages/CodesAmi';
import Jeux from './Pages/Jeux';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import '../src/Styles/Style.css'



function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <div style={{paddingTop: '7rem'}}></div>
        <Routes>
          <Route path="/jeux" element={<Jeux/>} />
          <Route path="/codes" element={<CodesAmi/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>  
    </div>
  );
}

export default App;
