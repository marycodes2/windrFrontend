import React from 'react'
import DashboardCard from '../Components/DashboardCard'
import { connect } from 'react-redux'
import { Grid, Card } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import GetToSwiping from '../Components/GetToSwiping'



class DashboardContainer extends React.Component {

  determineQueueCards = () => {
    const uncompletedUserCardIds = this.props.userCards.filter(userCard => (!(userCard.completed) && userCard.liked)).map(card => card.card_id)
    return this.props.myCards.filter(card => uncompletedUserCardIds.includes(card.id))
  }

  determineCompletedCards = () => {
    const completedUserCardIds = this.props.userCards.filter(userCard => userCard.completed).map(card => card.card_id)
    return this.props.myCards.filter(card => completedUserCardIds.includes(card.id))
  }

  determineLeaderBoard = () => {

  }

  render(){
    return(
      <Grid celled padded columns={2}>

        <Grid.Row>
          <Grid.Column padded>
            <h3>My Score</h3>
              <h4>{this.props.currentUser.score} Points</h4>
          </Grid.Column>
          <Grid.Column padded>
            <h3>LeaderBoard</h3>
              <h4>Fill out leaderboard...</h4>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column padded>
            <h3>Queue</h3>
              {(this.determineQueueCards().length < 1) ? <h4><i>No cards in your queue! <br></br><br></br> <GetToSwiping /></i></h4> : null}
              <Card.Group itemsPerRow={4}>
                  {this.determineQueueCards().map(card =>
                  <DashboardCard
                    card={card}
                    completed={false}
                    key={card.id}
                    /> )}
              </Card.Group>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column padded>
            <h3>Completed</h3>
            {(this.determineCompletedCards().length < 1) ? <h4><i>You have not completed any cards!</i></h4> : null}
            <Card.Group itemsPerRow={4}>
              {this.determineCompletedCards().map(card =>
              <DashboardCard card={card} completed={true} key={card.id}/>   )}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    myCards: state.reducer.myCards,
    userCards: state.reducer.userCards,
    currentUser: state.reducer.currentUser
  }
}

export default connect(mapStateToProps)(DashboardContainer)
