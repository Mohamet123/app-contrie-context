// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CountriesProvider } from './CountriesContext';
import { Contrie } from './Components/Contries';
import './App.css';

function App() {
  return (
    <CountriesProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="*" element={<Contrie />} />
          </Routes>
        </Router>
      </div>
    </CountriesProvider>
  );
}

export default App;
