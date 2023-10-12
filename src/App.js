import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar"
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Contact from './routes/Contact';
//import HospitalLocator from './routes/Info';
import MapComponent from './routes/Info';
import Location from './routes/Location';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/location' element={<Location/>}/>
          <Route path='/about' element={<MapComponent/>}/>
        </Routes>
        
       <Navbar/>
      
    </div>
  );
}

export default App;


























{/*
<Route path='/about' element={<Info/>}/>
          <Route path='/location' element={<LocationMap/>}/>
<Route path='/contact' element={<Contact/>}/>*/}