import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Swipeable from 'react-swipeable'
import Card from './Card'
import flowRight from 'lodash/flowRight';

export default class DemoSimple extends React.Component {

  determineCardsNotInQueue = () => {
    let myCardIds = this.props.myCards.map(card => card.id)

    let cardsNotInQueue = this.props.allCards.filter(card =>
      !(myCardIds.includes(card.id)))
    return cardsNotInQueue
  }

  respondToClick = (returnCard) => {
    this.props.addCard(returnCard)
    if (true) {
      fetch('http://localhost:3000/api/v1/user_cards', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          user_id: 1,
          card_id: returnCard.id,
          completed: false,
          expired: false
        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
    }
  }

  render() {
    return(
      <div>
        {this.determineCardsNotInQueue().slice(0, 1).map(card =>
        <div> <Card card={card} respondToClick={(card) => this.respondToClick(card)}/>  </div>)}
      </div>
    )
  }
}
