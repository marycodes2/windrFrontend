import React, { Component } from 'react';
import SwipeContainer from './SwipeContainer'
import Header from '../Components/Header'
import DashboardContainer from './DashboardContainer'
import {Route, Link, Switch, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchedMyCards, fetchedAllCards, fetchCards } from '../actions/simpleAction'

class App extends Component {

  state = {
    allCards: [],
    myCards: []
  }

  componentDidMount() {
    // fetch('http://localhost:3000/api/v1/cards')
    // .then(res => res.json())
    // .then(data => this.setState({allCards: data}))
    // .then(fetch(`http://localhost:3000/api/v1/users/${1}`)
    // .then(result => result.json())
    // .then(cardData => this.setState({myCards: cardData.cards})))
    this.props.fetchCards()
  }

  componentDidUpdate() {
    if (this.state.allCards.length === 1) {
      console.log("ONE LEFT")
    }
  }

  addCard(card) {
    this.setState({myCards: [...this.state.myCards, card]})
  }

  render() {
    return (
      <div className="App">
        <Header color={"blue"}/>
      <Switch>
        <Route exact path='/' component={()=> <SwipeContainer allCards={this.state.allCards} myCards={this.state.myCards} removeCard={() => this.removeCard()} addCard={(card)=> this.addCard(card)}/>}/>

        <Route path='/dashboard' render={(data) => {
              return <DashboardContainer/>}
              }
            />
      </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCards: () => {dispatch(fetchCards())}
})



export default withRouter(connect(null, mapDispatchToProps)(App));
