import React from 'react';
import Card from '../Components/Card'
import { connect } from 'react-redux'
import { addCardToMyCards, addCardToUserCards, settingUser, userNoLongerFirstTime } from '../actions/simpleAction'
import { Loader, Button, Header, Responsive, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class SwipeContainer extends React.Component {

  componentDidMount() {
    let token = localStorage.getItem('token')
    // console.log("token is equal to ", token)
    if (token && this.props.allCards.length < 1) {
      this.props.settingUser(token)
      // this.props.fetchCards()
    }
  }

  determineCardsNotInQueue = () => {
    var myCardIds = this.props.myCards.map(card => card.id)

    var cardsNotInQueue = this.props.allCards.filter(card =>
      !(myCardIds.includes(card.id)))

    return cardsNotInQueue

  }

  addCard = (card) => {
    this.props.addCardToMyCards(card)
  }

  respondToSwipe = (returnCard, position) => {
    let currentUser = this.props.currentUser
    this.addCard(returnCard)
    if (position === "left") {
      if (this.props.currentUser.first_time_user) {
        this.userNowKnowsApp()
      }
      this.props.addCardToUserCards(returnCard, false, currentUser)
    }
    else if (position === "right") {
      if (this.props.currentUser.first_time_user) {
        this.userNowKnowsApp()
      }
      this.props.addCardToUserCards(returnCard, true, currentUser)
    }
  }

  userNowKnowsApp = () => {
    this.props.userNoLongerFirstTime(this.props.currentUser.id)
  }

  render() {
    if (!this.props.loaded) {
      return <div
          id="swipe"
          className="ui one column grid cards">
          <Loader active inline='centered' />
        </div>
    }
    else if (this.determineCardsNotInQueue().length === 0) {
      return <div
        id="swipe"
        className="ui one column grid cards">
        <List>
          <List.Item>No cards left to swipe </List.Item>
          <List.Item> </List.Item>
          <List.Item>
            <Button color='pink' as={Link} to="/dashboard">
              Visit Dashboard
            </Button>
          </List.Item>
        </List>
      </div>
    }
    return(
      <React.Fragment>
        <Responsive
           minWidth={500}>
           {(this.props.currentUser.first_time_user) ? <React.Fragment><Header as='h3' id='getStarted' textAlign='center'>Welcome to Windr! <br/> Swipe <a id="right">right</a> on cards that pique your interest and <a id='left'>left</a> on cards that do not.</Header></React.Fragment> : null}
        </Responsive>
      <div
        id="swipe"
        className="ui one column grid cards">
        {this.determineCardsNotInQueue().slice(0, 1).map(card =>
        <Card card={card} key={card.id} respondToSwipe={(card, position) => this.respondToSwipe(card, position)}/>)}
      </div>
      <div
        id="likeAndDislikeButtons">
        <Button circular raised="true" size='massive' floated='left' icon='close' inverted color='red' onClick={() => this.respondToSwipe(this.determineCardsNotInQueue()[0], "left")}/>
        <Button circular raised="true" size='massive' floated='right'icon='like' inverted color='green' onClick={() => this.respondToSwipe(this.determineCardsNotInQueue()[0], "right")}/>
      </div>

      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    myCards: state.reducer.myCards,
    allCards: state.reducer.allCards,
    userCards: state.reducer.userCards,
    currentUser: state.reducer.currentUser,
    loaded: state.reducer.myCardsLoaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCardToMyCards: (card) => {dispatch(addCardToMyCards(card))},
    addCardToUserCards: (card, liked, currentUser) => {dispatch(addCardToUserCards(card, liked, currentUser))},
    settingUser: (token) => {dispatch(settingUser(token))},
    userNoLongerFirstTime: (id) => {dispatch(userNoLongerFirstTime(id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeContainer)
