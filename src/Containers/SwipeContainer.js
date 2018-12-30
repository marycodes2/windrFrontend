import React from 'react';
import Card from '../Components/Card'
import { connect } from 'react-redux'
import { addCardToMyCards, addCardToUserCards, settingUser, userNoLongerFirstTime } from '../actions/simpleAction'
import { Loader, Button, Header } from 'semantic-ui-react'


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
        No cards left to swipe!
      </div>
    }
    return(
      <React.Fragment>
      {(this.props.currentUser.first_time_user) ? <Header as='h3' textAlign='center'>Welcome to Windr! <br/> Get started by swiping <a id="right">right</a> on cards that pique your interest and <a id='left'>left</a> on cards that do not.</Header> : null}
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
