import './App.css';
import React, {useState} from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import AddAnimeForm from './components/AddAnimeForm';
import WatchList from './components/WatchList'
import EditAnime from './components/EditAnime';

function App() {

  return (
    <div className="App">
      <Navbar/>
      
    <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/watchlist" element={<WatchList />}/>
      <Route path="/addanimeform/:id" element={<AddAnimeForm/>}/>
      <Route path="/edit/:id" element={<EditAnime />} />
    </Routes>
    </div>
  );
}

export default App;
