import React from 'react'
import Card from '../Components/Card'
import DemoSimple from '../Components/SwipeableCards'


export default class SwipeContainer extends React.Component {
  render(){
    return(
      <div
        className="swipecontainer">
        <Card />
        <DemoSimple/>
      </div>
    )
  }
}
