import React, { Component } from 'react';
import SwipeContainer from './SwipeContainer'
import Header from '../Components/Header'
import DashboardContainer from './DashboardContainer'
import {Route, Link, Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header color={"blue"}/>
      <Switch>
        <Route path='/dashboard' component={DashboardContainer}/>
        <Route path='/' component={SwipeContainer}/>
      </Switch>
      </div>
    );
  }
}

export default App;
