import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { completeCard } from '../actions/simpleAction'
import { connect } from 'react-redux'
import { Image, Grid } from 'semantic-ui-react'
import MoreInfoModal from './MoreInfoModal'



const DashboardCard = (props, completed) => {

  const determineUserCard = () => {
    let userCard = props.userCards.filter(userCard => userCard.card_id === props.card.id)
    return userCard
  }

  const determineIfComplete = () => {
    if (!props.completed) {
      return (<MoreInfoModal card={props.card}/>)
    }
    else {
      return (<React.Fragment>
      <a>
        <Icon name='plus square outline'/>
        {props.card.score} points per action
        <br></br>
        <Icon name='star' />
        {props.card.stars}/5 Energy-Saving Stars
      </a>
    </React.Fragment>)
    }
  }

  return(

    <Card
      raised>
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
