import React from 'react';
import Home from './pages/Home.jsx';
import { Route, Routes, Link } from 'react-router-dom';
import Contacto from './pages/Contacto.jsx';
import './App.css'
import Registro from './pages/Registro.jsx';
import Login from './components/Login.jsx'
import Perfil from './components/Perfil.jsx';

//Componente de enrutacion con Routes


function App() {
  return (
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/contacto' Component={Contacto} />
      <Route path='/registro' Component={Registro} />
      <Route path='/login'  Component={Login} />
      <Route path='/perfil' Component={Perfil} />
    </Routes>
  )
}

export default App
