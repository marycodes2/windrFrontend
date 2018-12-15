import React from 'react'
import DashboardCard from '../Components/DashboardCard'
import { connect } from 'react-redux'


class DashboardContainer extends React.Component {

  determineQueueCards = () => {
    const t = this.props.myCards.filter(card => !(card.completed))
    console.log("queue cards", t)
    return t
  }

  determineCompletedCards = () => {
    const t = this.props.myCards.filter(card => (card.completed))
    console.log("completed cards", t)
    return t
  }

  render(){
    return(
      <div>
        <h2>Queue</h2>
          {this.determineQueueCards().map(card =>
            <DashboardCard card={card} key={card.id}/> )}
        <h2>Completed</h2>
          {this.determineCompletedCards().map(card =>
          <DashboardCard card={card} key={card.id}/>   )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    myCards: state.reducer.myCards
  }
}

export default connect(mapStateToProps)(DashboardContainer)
