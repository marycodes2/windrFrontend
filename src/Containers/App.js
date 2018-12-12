import React, { Component } from 'react';
import SwipeContainer from './SwipeContainer'
import Header from '../Components/Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header color={"blue"}/>
        <SwipeContainer />
      </div>
    );
  }
}

export default App;
