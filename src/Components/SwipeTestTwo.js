import React from 'react'
import Swipeable from 'react-swipeable'
import Card from './Card'

export default class SwipeComponent extends React.Component {

  state = {
    cards: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/cards')
    .then(res => res.json())
    .then(data => this.setState({cards: data}))
  }

  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
  }

  swipingLeft(e, absX) {
    console.log("You're Swiping to the Left...", e, absX)
  }

  swiped(e, deltaX, deltaY, isFlick, velocity) {
    console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
  }

  swipedUp(e, deltaY, isFlick) {
    console.log("You Swiped Up...", e, deltaY, isFlick)
  }

  render() {
    return (
      <Swipeable
        onSwiping={this.swiping}
        onSwipingLeft={this.swipingLeft}
        onSwiped={this.swiped}
        onSwipedUp={this.swipedUp} >
        {this.state.cards.map(card =>
        <div> <Card card={card}/> </div>)}
      </Swipeable>
    )
  }
}
