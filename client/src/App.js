import './App.css';
import './components/Main.css'
import React, {useState} from 'react';
import Main from './components/Main';
import Nav from './components/Nav';
import {Routes, Route} from 'react-router-dom';
import AddAnimeForm from './components/AddAnimeForm';
import WatchList from './components/WatchList'
import EditAnime from './components/EditAnime';
import Register from './components/Register';
import Login from './components/Login';

function App() {

  return (
    <div className="App">
      <Nav/>
      <div className="bg-img">
      
    <Routes>
      <Route path="/" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<Main />}/>
      <Route path="/watchlist" element={<WatchList />}/>
      <Route path="/addanimeform/:id" element={<AddAnimeForm/>}/>
      <Route path="/edit/:id" element={<EditAnime />} />
    </Routes>
    </div>
    </div>
  );
}

export default App;
