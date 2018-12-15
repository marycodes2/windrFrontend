import React from 'react';
import Card from '../Components/Card'
import { connect } from 'react-redux'
import { addCardsToMyCards as addCard} from '../actions/simpleAction'

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

  fetch = (card, liked) => {
    fetch('http://localhost:3000/api/v1/user_cards', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: 1,
        card_id: card.id,
        completed: false,
        expired: false,
        liked: liked
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }


  respondToSwipe = (returnCard, position) => {
    this.addCard(returnCard)
    if (position === "left") {
      this.fetch(returnCard, false)
    }
    else if (position === "right") {
      this.fetch(returnCard, true)
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
    allCards: state.reducer.allCards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (card) => {dispatch(addCard(card))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeContainer)
