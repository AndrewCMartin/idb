import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import ReactRouter from 'react-router-dom';

import Header from './Header'
import Main from './Main'
import 'react-bootstrap';


// var Router = ReactRouter.BrowserRouter;
// var Route = ReactRouter.Route;
// var Switch = ReactRouter.Switch;


const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App
