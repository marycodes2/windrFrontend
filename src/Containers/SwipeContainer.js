import React from 'react';
import Card from '../Components/Card'
import { connect } from 'react-redux'
import { addCardsToMyCards as addCard, addCardsToUserCards as addUserCard, addCardToQueue} from '../actions/simpleAction'

class SwipeContainer extends React.Component {

  determineCardsNotInQueue = () => {
    let myCardIds = this.props.myCards.map(card => card.id)

    let cardsNotInQueue = this.props.allCards.filter(card =>
      !(myCardIds.includes(card.id)))

    return cardsNotInQueue
  }

  addCard = (card) => {
    this.props.addCard(card)
  }

  respondToSwipe = (returnCard, position) => {
    this.addCard(returnCard)
    if (position === "left") {
      this.props.addCardToQueue(returnCard, false)
    }
    else if (position === "right") {
      this.props.addCardToQueue(returnCard, true)
    }
  }

  render() {
    return(
      <div>
        {this.determineCardsNotInQueue().slice(0, 1).map(card =>
        <div> <Card card={card} key={card.id} respondToSwipe={(card, position) => this.respondToSwipe(card, position)}/> </div>)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    myCards: state.reducer.myCards,
    allCards: state.reducer.allCards,
    userCards: state.reducer.userCards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (card) => {dispatch(addCard(card))},
    addCardToQueue: (card, liked) => {dispatch(addCardToQueue(card, liked))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeContainer)
