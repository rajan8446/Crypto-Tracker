import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';


function App() {

  return (

    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' Component={Homepage} exact/>
          <Route path='/coins/:id' Component={CoinPage} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
