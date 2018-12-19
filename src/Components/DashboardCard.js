import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { completeCard } from '../actions/simpleAction'
import { connect } from 'react-redux'
import { Image, Grid } from 'semantic-ui-react'


const DashboardCard = (props, completed) => {

  const determineIfComplete = () => {
    if (!props.completed) {
      return (<React.Fragment>
        <br></br>
      <input
      type="checkbox"
      name="completed"
      onChange={() => props.completeCard(props.card)}
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

const mapDispatchToProps = dispatch => ({
  completeCard: (card) => {dispatch(completeCard(card))}
})

export default connect(null, mapDispatchToProps)(DashboardCard)
