import React from 'react';
import Home from './pages/Home.jsx';
import { Route, Routes } from 'react-router-dom';
import Contacto from './pages/Contacto.jsx';
import './App.css'
import Registro from './pages/Registro.jsx';
import Login from './pages/Login.jsx';
import Recovery from './pages/recovery.jsx';
import Perfil from './pages/Perfil.jsx'

//Componente de enrutacion con Routes


function App() {
  return (
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/contacto' Component={Contacto} />
      <Route path='/registro' Component={Registro} />
      <Route path='/login' Component={Login} />
      <Route path='/recovery' Component={Recovery} />
      <Route path='/perfil' Component={Perfil}/>
    </Routes>
  )
}

export default App
