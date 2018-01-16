import React, { Component } from 'react';
import './reset.css';
import './App.css';
import routes from './routes.js'


class App extends Component {
  render() {
    return (
      <div>
        {routes}
      </div>
    );
  }
}

export default App;
