import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CodesAmi from './Pages/CodesAmi';
import Jeux from './Pages/Jeux';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/jeux" element={<Jeux/>} />
        </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
