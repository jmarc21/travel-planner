import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home'
import Header from './components/header/Header'
import routes from './routes.js'


class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        {routes}
      </div>
    );
  }
}

export default App;
