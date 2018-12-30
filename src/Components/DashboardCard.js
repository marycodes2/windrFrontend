import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { completeCard } from '../actions/simpleAction'
import { connect } from 'react-redux'
import { Image } from 'semantic-ui-react'
import MoreInfoModal from './MoreInfoModal'
import DetermineNumStars from '../CardModalForms/DetermineNumStars'


const DashboardCard = (props, completed) => {

  const determineUserCard = () => {
    let userCard = props.userCards.filter(userCard => userCard.card_id === props.card.id)
    return userCard
  }

  const determineIfComplete = () => {
    if (!props.completed) {
      return (<MoreInfoModal key={props.card.id} card={props.card}/>)
    }
    else {
      return (<React.Fragment>
        <Icon name='dollar sign' />
        {determineUserCard()[0].total_dollar_savings} Saved per Year
        <br/>
        <Icon name='plus square outline'/>
        {determineUserCard()[0].total_windr_score} Windr Points
        <br/>
        Upfront Cost: <DetermineNumStars key={`${props.card.id}-cost`}icon={"dollar"} measurement={props.card.upfront_cost}/>
        <br/>
        Envira-Stars:  <DetermineNumStars key={`${props.card.id}-envira`} icon={"envira"} measurement={props.card.stars}/>
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
      <Card.Content>
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
