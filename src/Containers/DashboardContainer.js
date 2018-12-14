import React from 'react'
import Card from '../Components/Card'

export default class DashboardContainer extends React.Component {
  render(){
    return(
      <div>
        <h2>Queue</h2>
          {this.props.myCards.map(card =>
            <Card card={card}/> )}
      </div>
    )
  }
}
