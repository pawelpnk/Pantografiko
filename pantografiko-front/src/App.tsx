import React from 'react';
import './App.css';
import StoreProvider from './store/StoreProvider';
import Header from './components/header/Header';
import Login from './components/loginPage/login';
import Menu from './components/menu/menu';
import Content from './components/content/Content';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <StoreProvider>
        
        <Router>
        <Header />
          <div className="wrapper">
            <Menu />            
            <Content />            
          </div>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
