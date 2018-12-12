import React from 'react'
import Card from '../Components/Card'
import DemoSimple from '../Components/SwipeableCards'
import Test from '../Components/SwipeTestTwo'


export default class SwipeContainer extends React.Component {
  render(){
    return(
      <div
        className="swipecontainer">
        <DemoSimple/>
      </div>
    )
  }
}
