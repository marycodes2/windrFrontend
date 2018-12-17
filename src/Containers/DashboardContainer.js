import React from 'react'
import DashboardCard from '../Components/DashboardCard'
import { connect } from 'react-redux'


class DashboardContainer extends React.Component {

  determineQueueCards = () => {
    const uncompletedUserCardIds = this.props.userCards.filter(userCard => (!(userCard.completed) && userCard.liked )).map(card => card.id)
    return this.props.myCards.filter(card => uncompletedUserCardIds.includes(card.id))
  }

  determineCompletedCards = () => {
    const completedUserCardIds = this.props.userCards.filter(userCard => userCard.completed).map(card => card.id)
    return this.props.myCards.filter(card => completedUserCardIds.includes(card.id))
  }

  render(){
    return(
      <div>
        <h2>Queue</h2>
          {this.determineQueueCards().map(card =>
            <DashboardCard card={card} completed={false} key={card.id}/> )}
        <h2>Completed</h2>
          {this.determineCompletedCards().map(card =>
          <DashboardCard card={card} completed={true} key={card.id}/>   )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    myCards: state.reducer.myCards,
    userCards: state.reducer.userCards
  }
}

export default connect(mapStateToProps)(DashboardContainer)
