import React, { Component } from 'react';
import SwipeContainer from './SwipeContainer'
import Header from '../Components/Header'
import DashboardContainer from './DashboardContainer'
import {Route, Link, Switch} from 'react-router-dom'

class App extends Component {

  state = {
    allCards: [],
    myCards: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/cards')
    .then(res => res.json())
    .then(data => this.setState({allCards: data}))
    .then(fetch(`http://localhost:3000/api/v1/users/${1}`)
    .then(result => result.json())
    .then(cardData => this.setState({myCards: cardData.cards})))
  }

  componentDidUpdate() {
    if (this.state.allCards.length === 1) {
      console.log("ONE LEFT")
    }
  }

  removeCard() {
    let newAllCards = this.state.allCards.slice()
    newAllCards.splice(0,1)
    this.setState({allCards:newAllCards})
  }

  addCard(card) {
    this.setState({myCards: [...this.state.myCards, card]})
  }

  render() {
    return (
      <div className="App">
        <Header color={"blue"}/>
      <Switch>
        <Route path='/dashboard' component={() => <DashboardContainer myCards={this.state.myCards}/>}/>
        <Route path='/' component={()=> <SwipeContainer allCards={this.state.allCards} myCards={this.state.myCards} removeCard={() => this.removeCard()} addCard={(card)=> this.addCard(card)}/>}/>
      </Switch>
      </div>
    );
  }
}

export default App;
