import React from 'react';
import Card from '../Components/Card'
import { connect } from 'react-redux'
import { addCardToMyCards, addCardToUserCards, settingUser } from '../actions/simpleAction'
import { Loader } from 'semantic-ui-react'


class SwipeContainer extends React.Component {

  state = {
    lastCard: {}
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token && this.props.allCards.length < 1) {
      this.props.settingUser(token)
      // this.props.fetchCards()
    }
  }

  determineCardsNotInQueue = () => {
    var myCardIds = this.props.myCards.map(card => card.id)

    let cardsNotInQueue = this.props.allCards.filter(card =>
      !(myCardIds.includes(card.id)))

    return cardsNotInQueue

  }

  addCard = (card) => {
    this.props.addCardToMyCards(card)
  }

  respondToSwipe = (returnCard, position) => {
    let currentUser = this.props.currentUser
    if (position === "left") {
      // this.props.addCardToUserCards(returnCard, false, currentUser)
      this.setState({lastCard: returnCard})
    }
    else if (position === "right") {
      this.addCard(returnCard)
      this.props.addCardToUserCards(returnCard, true, currentUser)
    }
  }

  returnRandomCard() {
    let arr = this.determineCardsNotInQueue()
    var rand = arr[Math.floor(Math.random() * arr.length)]
    if (this.state.lastCard === rand) {
      var rand = this.returnRandomCard()
    }
    return rand
  }

  render() {
    if (!this.props.loaded) {
      return <div
          id="swipe"
          className="ui one column grid cards">
          <Loader active inline='centered' />
        </div>
    }
    else if (this.determineCardsNotInQueue().length < 2) {
      return <div
          id="swipe"
          className="ui one column grid cards">
          No cards left to swipe!
        </div>
    }
    else {
      let x = this.returnRandomCard()
      if (x) {
      console.log("Hitting in render...", x)
      return (
        <div
          id="swipe"
          className="ui one column grid cards">
          <Card card={x} key={x.id} respondToSwipe={(x, position) => this.respondToSwipe(x, position)}/>
        </div>) }
      else {
        return <div>No more cards left!</div>
      }
      }
  }
}

const mapStateToProps = state => {
  return {
    myCards: state.reducer.myCards,
    allCards: state.reducer.allCards,
    userCards: state.reducer.userCards,
    currentUser: state.reducer.currentUser,
    loaded: state.reducer.myCardsLoaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCardToMyCards: (card) => {dispatch(addCardToMyCards(card))},
    addCardToUserCards: (card, liked, currentUser) => {dispatch(addCardToUserCards(card, liked, currentUser))},
    settingUser: (token) => {dispatch(settingUser(token))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeContainer)
