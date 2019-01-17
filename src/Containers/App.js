import React, { Component } from 'react';
import SwipeContainer from './SwipeContainer'
import Header from '../Components/Header'
import DashboardContainer from './DashboardContainer'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import SignUp from '../Components/SignUp'
import Login from '../Components/Login'
import { settingUser } from '../actions/simpleAction'


class App extends Component {

  componentDidMount() {
    // console.warn("Mounting app")
    // console.warn(this.props.allCards.length)
    let token = localStorage.getItem('token')
    // console.log("token is equal to ", token)
    if (token && this.props.allCards.length < 1) {
      this.props.settingUser(token)
    }
    // var http = require("http");
    // console.log(http)
    //
    // setInterval(function() {
    // console.log("this works!")
    // http.get("https://windrapp.herokuapp.com");
    // }, 30000); // every 5 minutes, should be 300000

  }

  render() {

    return (
      <React.Fragment>
        <Header />
      <Switch>

        <Route exact path='/' render={() => <Redirect to="/profile"/> } />

        <Route exact path='/profile' render={() => this.props.currentUser ? <SwipeContainer/> : <Redirect to='/login'/>}/>

        <Route exact path='/login' render={() => this.props.currentUser ? <Redirect to='/profile'/> : <Login />}/>

        <Route exact path='/dashboard' render={() => this.props.currentUser ? <DashboardContainer/> : <Login />}/>

        <Route exact path='/signup' render={() => this.props.currentUser ? <Redirect to='/profile'/> : <SignUp />}/>

        <Route path='/' render={() => this.props.currentUser ? <Redirect to='/profile'/> : <Redirect to='/login'/>}/>

      </Switch>
    </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    allCards: state.reducer.allCards,
    currentUser: state.reducer.currentUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    settingUser: (token) => {dispatch(settingUser(token))}
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
