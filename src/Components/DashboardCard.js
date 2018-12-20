import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { completeCard } from '../actions/simpleAction'
import { connect } from 'react-redux'
import { Image, Grid } from 'semantic-ui-react'




const DashboardCard = (props, completed) => {

  const determineUserCard = () => {
    let userCard = props.userCards.filter(userCard => userCard.card_id === props.card.id)
    return userCard
  }

  const determineIfComplete = () => {
    if (!props.completed) {
      return (<React.Fragment>
        <br></br>
      <input
      type="checkbox"
      name="completed"
      onChange={() => props.completeCard(props.userCard, props.currentUser, determineUserCard())}
      ></input>
      <label for="completed"> Completed?</label>
      </React.Fragment>)
    }

  }



  return(
    <Card className ="dashcard">
      <Card.Content>
        <Image floated='right' size='mini' src={require(`../images/${props.card.image}.jpg`)}/>
        <Card.Header>{props.card.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        {determineIfComplete()}
      </Card.Content>
    </Card>
)
}

const mapStateToProps = state => {
  return {
    currentUser: state.reducer.currentUser,
    myCards: state.reducer.myCards,
    userCards: state.reducer.userCards
  }
}

const mapDispatchToProps = dispatch => ({
  completeCard: (card, currentUser, userCard) => {dispatch(completeCard(card, currentUser, userCard))}
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCard)
