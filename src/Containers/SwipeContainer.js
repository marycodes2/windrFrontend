import React from 'react'
import DemoSimple from '../Components/SwipeableCards'


export default class SwipeContainer extends React.Component {
  render(){
    return(
      <div
        className="swipecontainer">
        <DemoSimple removeCard={this.props.removeCard} addCard={this.props.addCard}/>
      </div>
    )
  }
}
