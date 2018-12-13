import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Swipeable from 'react-swipeable'
import Card from './Card'
import flowRight from 'lodash/flowRight';

export default class DemoSimple extends React.Component {

  state = {
    cards: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/cards')
    .then(res => res.json())
    .then(data => this.setState({cards: data}))
  }

  onChangeIndex = (index, indexLatest, meta) => {
    const cardId = this.state.cards[indexLatest].id
    if (index > indexLatest) {
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
      <SwipeableViews enableMouseEvents
        onChangeIndex={this.onChangeIndex}>
        {this.state.cards.map(card =>
        <div> <Card card={card}/> </div>)}
      </SwipeableViews>
    )
  }
}
