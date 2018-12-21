import React from 'react';
import Card from '../Components/Card'
import { connect } from 'react-redux'
import { addCardToMyCards, addCardToUserCards, settingUser } from '../actions/simpleAction'

class SwipeContainer extends React.Component {

  componentDidMount() {
    let token = localStorage.getItem('token')
    console.log("token is equal to ", token)
    if (token) {
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
    this.addCard(returnCard)
    if (position === "left") {
      this.props.addCardToUserCards(returnCard, false, currentUser)
    }
    else if (position === "right") {
      this.props.addCardToUserCards(returnCard, true, currentUser)
    }
  }

  render() {
    return(
      <div
        id="swipe"
        className="ui one column grid cards">
        {this.determineCardsNotInQueue().slice(0, 1).map(card =>
        <React.Fragment> <Card card={card} key={card.id} respondToSwipe={(card, position) => this.respondToSwipe(card, position)}/> </React.Fragment>)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    myCards: state.reducer.myCards,
    allCards: state.reducer.allCards,
    userCards: state.reducer.userCards,
    currentUser: state.reducer.currentUser
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
