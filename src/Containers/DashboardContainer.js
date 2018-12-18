import React from 'react'
import DashboardCard from '../Components/DashboardCard'
import { connect } from 'react-redux'
import { Grid, Card } from 'semantic-ui-react'


class DashboardContainer extends React.Component {

  determineQueueCards = () => {
    const uncompletedUserCardIds = this.props.userCards.filter(userCard => (!(userCard.completed) && userCard.liked && (!userCard.expired))).map(card => card.id)
    return this.props.myCards.filter(card => uncompletedUserCardIds.includes(card.id))
  }

  determineCompletedCards = () => {
    const completedUserCardIds = this.props.userCards.filter(userCard => userCard.completed).map(card => card.id)
    return this.props.myCards.filter(card => completedUserCardIds.includes(card.id))
  }

  render(){
    return(
      <Grid celled padded>
        <Grid.Row>
          <Grid.Column width={16} columns={3} className="ui three column grid" padded>
            <h3>Queue</h3>
              <Card.Group className="row">
                {this.determineQueueCards().map(card =>
                <DashboardCard card={card} completed={false} key={card.id}/> )}</Card.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <h3>Completed</h3>
              {this.determineCompletedCards().map(card =>
              <DashboardCard card={card} completed={true} key={card.id}/>   )}
          </Grid.Column>
        </Grid.Row>

      </Grid>
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
