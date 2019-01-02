import React from 'react'
import DashboardCard from '../Components/DashboardCard'
import { connect } from 'react-redux'
import { Grid, Card } from 'semantic-ui-react'
import GetToSwiping from '../Components/GetToSwiping'
import { getUsers } from '../actions/simpleAction'
import { List, Image, Header, Loader } from 'semantic-ui-react'
import CalculateDollarsSaved from '../Components/CalculateDollarsSaved'

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

  getSum = (total, num) => {
    return total + num
  }

  determinePotentialSavings = () => {
    let sumList = this.determineQueueCards().map(card => card.dollar_savings)
    let sum = sumList.reduce(this.getSum, 0)
    return sum
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
    if (leader) {
      let username = leader.split("-")[0].trim()
      let user = this.props.allUsers.filter(user => (
        user.username === username
      ))
      if (user[0].avatar) {
        return <Image avatar src={require(`../images/avatars/${user[0].avatar}.jpg`)} /> }}
    else {
      return <Image avatar src={require(`../images/avatars/Heart.jpg`)} />
    }
  }

  returnCurrentUser = () => {
    if (this.props.currentUser.avatar) {
      return <div >
        <Image src={require(`../images/avatars/${this.props.currentUser.avatar}.jpg`)} avatar centered />
        <span>
          <i><Header as='h1'>Hi {this.props.currentUser.name}!</Header></i>
        </span>
      </div>
    }
    else {
      return <div >
        <Image src={require(`../images/avatars/Heart.jpg`)} avatar centered />
        <span>
          <i><Header as='h1'>Hi {this.props.currentUser.name}!</Header></i>
        </span>
      </div>
    }
  }

  renderLeaderBoard = () => {
    if (this.determineLeaderBoard().length === 0) {
      return <Loader active inline='centered' />
    }
    else {
      return <List ordered>{this.determineLeaderBoard().map(leader => <List.Item key={leader.id} as='a'> {this.determineAvatar(leader)}  {leader}</List.Item>)}</List>
    }
  }

  render(){
    // add 'celled' to Grid below if you want to separate the grids
    return(
      <React.Fragment>
      <Grid padded columns={1} textAlign='centered'>
        <Grid.Row>
          {this.returnCurrentUser()}
        </Grid.Row>
      </Grid>

      <Grid padded columns={2}>

        <Grid.Row>
          <Grid.Column padded="true">
            <Header as='h3' dividing>My Score</Header>
            <Header as='h1'>{this.props.currentUser.score} Points</Header>
            <Header as='h1'><CalculateDollarsSaved /> Saved</Header>
            <Header as='h1'>${this.determinePotentialSavings()} Potential Savings</Header>
          </Grid.Column>

          <Grid.Column padded="true">
            <Header as='h3' dividing>LeaderBoard</Header>
            {this.renderLeaderBoard()}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column padded="true">
            <Header as='h3' dividing>Queue: <a id="queue">Select <i>'More Info'</i> to complete your cards and <u>earn points.</u></a></Header>
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
          <Grid.Column padded="true">
            <Header as='h3' dividing>Completed: <a id="queue">Actions you have completed. Great job!</a></Header>
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
