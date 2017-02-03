import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MyAnimation from './MyAnimation';

class App extends Component {
  render() {
    return (
      <div>
        <p>
          Check out this web animation:
        </p>
        <MyAnimation />
      </div>
    );
  }
}

export default App;
