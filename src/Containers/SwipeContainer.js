import React from 'react'
import Card from '../Components/Card'
import DemoSimple from '../Components/SwipeableCards'


export default class SwipeContainer extends React.Component {
  render(){
    return(
      <div
        className="swipecontainer">
        <DemoSimple allCards={this.props.allCards} myCards={this.props.myCards} removeCard={this.props.removeCard} addCard={this.props.addCard}/>
      </div>
    )
  }
}
