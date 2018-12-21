import React, { Component } from 'react';
import SwipeContainer from './SwipeContainer'
import Header from '../Components/Header'
import DashboardContainer from './DashboardContainer'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import SignUp from '../Components/SignUp'
import Login from '../Components/Login'
import { settingUser, fetchCards } from '../actions/simpleAction'
import { Loader } from 'semantic-ui-react'


class App extends Component {

  componentDidMount() {
    console.warn("Mounting app")
    console.warn(this.props.allCards.length)
    let token = localStorage.getItem('token')
    console.log("token is equal to ", token)
    if (token && this.props.allCards.length < 1) {
      this.props.settingUser(token)
      // this.props.fetchCards()
    }
    // console.log("current user is", this.props.currentUser)
  }

  render() {

    return (
      <React.Fragment>
        <Header color={"blue"}/>
      <Switch>

        //This should be swipe container, but switched to signup for testing
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
    myCards: state.reducer.myCards,
    allCards: state.reducer.allCards,
    currentUser: state.reducer.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    settingUser: (token) => {dispatch(settingUser(token))},
    fetchCards: () => {dispatch(fetchCards())}
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
