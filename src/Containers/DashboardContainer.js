import React from 'react'
import Card from '../Components/Card'

export default class DashboardContainer extends React.Component {
  state = {
    myCards: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users/${1}`)
    .then(res => res.json())
    .then(data => this.setState({myCards: data.cards}))
  }
  render(){
    return(
      <div>
        <h2>Queue</h2>
          {this.state.myCards.map(card =>
            <Card card={card}/> )}
      </div>
    )
  }
}
