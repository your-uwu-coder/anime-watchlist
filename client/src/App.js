import './App.css';
import React from 'react';
import Main from './components/Main';
import Nav from './components/Nav';
import {Routes, Route} from 'react-router-dom';
import AddAnimeForm from './components/AddAnimeForm';
import AllAnime from './components/AllAnime'
import EditAnime from './components/EditAnime';
import Register from './components/Register';
import Login from './components/Login';
import { UserProvider } from './context/UserContext';

function App() {
  
  return (
    <div className="App">
    <UserProvider>
      <Nav/>
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Main />}/>
        <Route path="/allanime" element={<AllAnime />}/>
        <Route path="/addanimeform/:id" element={<AddAnimeForm/>}/>
        <Route path="/edit/:id" element={<EditAnime />} />
      </Routes>
    </UserProvider>
    </div>
  );
}

export default App;
