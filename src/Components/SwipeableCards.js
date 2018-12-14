import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Swipeable from 'react-swipeable'
import Card from './Card'
import flowRight from 'lodash/flowRight';

export default class DemoSimple extends React.Component {

  determineCardsNotInQueue = () => {
    console.log(this.props.myCards)
    let myCardIds = this.props.myCards.map(card => card.id)

    let cardsNotInQueue = this.props.allCards.filter(card =>
      !(myCardIds.includes(card.id)))

    console.log("available cards", cardsNotInQueue)
    console.log("cards props", this.props.allCards)
    console.log("my cards state", this.props.myCards)

    return cardsNotInQueue
  }

  respondToClick = (cardId) => {
    console.log("cardId",cardId)
    this.props.removeCard()
    const card = this.determineCardsNotInQueue()[cardId]
    if (true) {
      fetch('http://localhost:3000/api/v1/user_cards', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          user_id: 1,
          card_id: cardId,
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
        <div> <Card card={card} respondToClick={(cardId) => this.respondToClick(cardId)}/>  </div>)}
      </div>
    )
  }
}
