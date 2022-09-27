import Header from './components/header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/home';
import Login from './components/Login';
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './components/dashboard';
// import { useState } from 'react';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
