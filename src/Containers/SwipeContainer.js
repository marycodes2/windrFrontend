import React from 'react';
import Card from '../Components/Card'
import { connect } from 'react-redux'
import { addCardToMyCards, addCardToUserCards} from '../actions/simpleAction'

class SwipeContainer extends React.Component {

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
    this.addCard(returnCard)
    if (position === "left") {
      this.props.addCardToUserCards(returnCard, false)
    }
    else if (position === "right") {
      this.props.addCardToUserCards(returnCard, true)
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
    userCards: state.reducer.userCards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCardToMyCards: (card) => {dispatch(addCardToMyCards(card))},
    addCardToUserCards: (card, liked) => {dispatch(addCardToUserCards(card, liked))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeContainer)
