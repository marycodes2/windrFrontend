import React, { Component } from 'react';
import SwipeContainer from './SwipeContainer'
import Header from '../Components/Header'
import DashboardContainer from './DashboardContainer'
import {Route, Switch, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCards } from '../actions/simpleAction'

class App extends Component {

  componentDidMount() {
    this.props.fetchCards()
  }

  render() {
    return (
      <React.Fragment>
        <Header color={"blue"}/>
      <Switch>

        <Route path='/dashboard'
          component={DashboardContainer}/>

          <Route path='/'
              component={SwipeContainer}/>

      </Switch>
    </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCards: () => {dispatch(fetchCards())}
})

const mapStateToProps = state => {
  return {
    myCards: state.reducer.myCards,
    allCards: state.reducer.allCards
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
