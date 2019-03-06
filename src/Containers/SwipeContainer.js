import React from 'react';
import Card from '../Components/Card'
//connect to redux store (state management tool)
import { connect } from 'react-redux'
//import redux actions
import { addCardToMyCards, addCardToUserCards, settingUser, userNoLongerFirstTime, userNoLongerFirstTimeSwipe } from '../actions/simpleAction'
// import styling component library - semantic
import { Loader, Button, Header, Responsive, List, Modal, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class SwipeContainer extends React.Component {
  state = {
    open: true,
    visits: 0
  }

  componentDidMount() {
    // if JWT token in local storage, user signed in
    let token = localStorage.getItem('token')
    // console.log("token is equal to ", token)
    // if the token exists and EE cards are fetched from backend, set user
    if (token && this.props.allCards.length < 1) {
      this.props.settingUser(token)
    }
  }


  determineCardsNotInQueue = () => {
    //find all of user's card ids
    var myCardIds = this.props.myCards.map(card => card.id)

    //find all cards that have not been added to user's queue
    var cardsNotInQueue = this.props.allCards.filter(card =>
      !(myCardIds.includes(card.id)))

    return cardsNotInQueue

  }

  addCard = (card) => {
    this.props.addCardToMyCards(card)
  }

  //respond to user swipe of card
  respondToSwipe = (returnCard, position) => {
    let currentUser = this.props.currentUser
    this.addCard(returnCard)
    if (position === "left") {
      if (this.props.currentUser.first_time_user) {
        this.userNowKnowsAppSwipe()
      }
      //add card to the user's cards, but don't add card to user's queue
      this.props.addCardToUserCards(returnCard, false, currentUser)
    }
    else if (position === "right") {
      if (this.props.currentUser.first_time_user) {
        this.userNowKnowsAppSwipe()
      }
      //add card to the user's cards and add card to user's queue
      this.props.addCardToUserCards(returnCard, true, currentUser)
    }
  }

  userNowKnowsApp = () => {
    this.props.userNoLongerFirstTime(this.props.currentUser.id)
  }

  //removes instructions from this screen on next page load
  userNowKnowsAppSwipe = () => {
    this.props.userNoLongerFirstTimeSwipe(this.props.currentUser.id)
  }

  close = () => {
    this.setState({ open: false })
    this.userNowKnowsApp()
  }

  //responsive design below
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
           minWidth={451}>
           {(this.props.currentUser.first_time_user) ? <React.Fragment><Header as='h3' id='getStarted' textAlign='center'>Welcome to Windr! <br/> Swipe <a id="right">right</a> on cards that pique your interest and <a id='left'>left</a> on cards that do not.</Header></React.Fragment> : null}
        </Responsive>

        <Responsive
           maxWidth={450}>
           {this.props.currentUser.first_time_user ?
            <Modal
              open={this.state.open}>
              <Modal.Content>
                Welcome to Windr! Swipe right on cards that pique your interest and left on cards that do not.
              </Modal.Content>
              <Modal.Actions>
                <Button color='green' onClick={this.close} inverted>
                  <Icon name='checkmark' /> Got it
                </Button>
              </Modal.Actions>
            </Modal> : null}
        </Responsive>

      <div
        id="swipe"
        className="ui one column grid cards">
        {this.determineCardsNotInQueue().slice(0, 1).map(card =>
        <Card card={card} key={card.id} respondToSwipe={(card, position) => this.respondToSwipe(card, position)}/>)}
      </div>

      <Responsive
        minWidth={1301}>
        <div
          id="likeAndDislikeButtonsLargeScreen">
          <Button circular raised="true" size='massive' floated='left' icon='close' inverted color='red' onClick={() => this.respondToSwipe(this.determineCardsNotInQueue()[0], "left")}/>
          <Button circular raised="true" size='massive' floated='right'icon='like' inverted color='green' onClick={() => this.respondToSwipe(this.determineCardsNotInQueue()[0], "right")}/>
        </div>
      </Responsive>

      <Responsive
        minWidth={451} maxWidth={1300}>
        <div
          id="likeAndDislikeButtons">
          <Button circular raised="true" size='massive' floated='left' icon='close' inverted color='red' onClick={() => this.respondToSwipe(this.determineCardsNotInQueue()[0], "left")}/>
          <Button circular raised="true" size='massive' floated='right'icon='like' inverted color='green' onClick={() => this.respondToSwipe(this.determineCardsNotInQueue()[0], "right")}/>
        </div>
    </Responsive>

    <Responsive
      maxWidth={450}>
      <div
        id="likeAndDislikeButtonsForMobile">
        <Button circular raised="true" size='massive' floated='left' icon='close' inverted color='red' onClick={() => this.respondToSwipe(this.determineCardsNotInQueue()[0], "left")}/>
        <Button circular raised="true" size='massive' floated='right'icon='like' inverted color='green' onClick={() => this.respondToSwipe(this.determineCardsNotInQueue()[0], "right")}/>
      </div>
    </Responsive>

  </React.Fragment>
    )
  }
}

//connect state to redux store
const mapStateToProps = state => {
  return {
    myCards: state.reducer.myCards,
    allCards: state.reducer.allCards,
    userCards: state.reducer.userCards,
    currentUser: state.reducer.currentUser,
    loaded: state.reducer.myCardsLoaded
  }
}

//connect methods to redux store
const mapDispatchToProps = (dispatch) => {
  return {
    addCardToMyCards: (card) => {dispatch(addCardToMyCards(card))},
    addCardToUserCards: (card, liked, currentUser) => {dispatch(addCardToUserCards(card, liked, currentUser))},
    settingUser: (token) => {dispatch(settingUser(token))},
    userNoLongerFirstTime: (id) => {dispatch(userNoLongerFirstTime(id))},
    userNoLongerFirstTimeSwipe: (id) => {dispatch(userNoLongerFirstTimeSwipe(id))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwipeContainer)
