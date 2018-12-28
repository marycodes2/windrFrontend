import React from 'react'
import DashboardCard from '../Components/DashboardCard'
import { connect } from 'react-redux'
import { Grid, Card } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import GetToSwiping from '../Components/GetToSwiping'
import { getUsers } from '../actions/simpleAction'
import { List, Image, Header, Icon } from 'semantic-ui-react'

class DashboardContainer extends React.Component {

  componentDidMount() {
    this.props.getUsers()
  }
  determineQueueCards = () => {
    const uncompletedUserCardIds = this.props.userCards.filter(userCard => (!(userCard.completed) && userCard.liked)).map(card => card.card_id)
    return this.props.myCards.filter(card => uncompletedUserCardIds.includes(card.id))
  }

  determineCompletedCards = () => {
    const completedUserCardIds = this.props.userCards.filter(userCard => userCard.completed).map(card => card.card_id)
    return this.props.myCards.filter(card => completedUserCardIds.includes(card.id))
  }

  determineLeaderBoard = () => {
    if (this.props.usersHash) {
    let usersHash = this.props.usersHash
    let usernames = Object.keys(usersHash)
    let sortedUsernames = usernames.sort(function(a, b) {
      return usersHash[a] - usersHash[b]
    })
    sortedUsernames = sortedUsernames.reverse()
    let returnValue = []
    let i = 0
    while (i < 5 && i < sortedUsernames.length) {
      returnValue.push(`${sortedUsernames[i]} - ${usersHash[sortedUsernames[i]]}`)
      i++
    }
    return returnValue
  }
  else {
    return []
  }
  }

  determineAvatar(leader) {
    let username = leader.split(" ")[0]
    let user = this.props.allUsers.filter(user => (
      user.username === username
    ))
    return <Image avatar src={require(`../images/${user[0].avatar}.jpg`)} />
  }

  returnCurrentUser = () => {
    if (this.props.currentUser) {
      return <i><Header center as='h1' textAlign='center'>Hi {this.props.currentUser.name}!</Header></i>
    }
  }

  render(){
    // add 'celled' to Grid below if you want to separate the grids
    return(
      <React.Fragment>
      {this.returnCurrentUser()}
      <Grid padded columns={2}>

        <Grid.Row>
          <Grid.Column padded>
            <Header as='h3' dividing>My Score</Header>
            <Header as='h1'>{this.props.currentUser.score} Points</Header>
          </Grid.Column>

          <Grid.Column padded>
            <Header as='h3' dividing>LeaderBoard</Header>
              <List ordered>{this.determineLeaderBoard().map(leader => <List.Item as='a'> {this.determineAvatar(leader)}  {leader}</List.Item>)}</List>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column padded>
            <Header as='h3' dividing>Queue</Header>
              {(this.determineQueueCards().length < 1) ? <h4><i>No cards in your queue! <br></br><br></br> <GetToSwiping /></i></h4> : null}
              <Card.Group itemsPerRow={1}>
                  {this.determineQueueCards().map(card =>
                  <DashboardCard
                    card={card}
                    completed={false}
                    key={card.id}
                    /> )}
              </Card.Group>
          </Grid.Column>
          <Grid.Column padded>
            <Header as='h3' dividing>Completed</Header>
            {(this.determineCompletedCards().length < 1) ? <h4><i>You have not completed any cards!</i></h4> : null}
            <Card.Group itemsPerRow={1}>
              {this.determineCompletedCards().map(card =>
              <DashboardCard card={card} completed={true} key={card.id}/>   )}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    myCards: state.reducer.myCards,
    userCards: state.reducer.userCards,
    currentUser: state.reducer.currentUser,
    usersHash: state.reducer.usersHash,
    allUsers: state.reducer.allUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => {dispatch(getUsers())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
