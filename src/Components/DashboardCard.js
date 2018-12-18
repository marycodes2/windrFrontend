import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { completeCard } from '../actions/simpleAction'
import { connect } from 'react-redux'
import { Image } from 'semantic-ui-react'


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
  <div className="ui column">
  <Card className ="ui card dashcard">
    <Card.Content>
      <Image floated='right' size='mini' src={props.card.image}/>
      <Card.Header>{props.card.name}</Card.Header>
      {determineIfComplete()}
  </Card.Content>
  </Card>
  </div>

  // <Card
  //   className="ui centered card"
  //   header={props.card.name}
  //   meta=''
  //
  //   description={props.card.description}
  //   extra={
  //   <React.Fragment>
  //   <a>
  //     <Icon name='dollar sign' />
  //     {props.card.dollar_savings* 5} Saved Over 5 Years
  //     <br/>
  //     <Icon name='dollar sign' />
  //     {props.card.upfront_cost} Upfront Cost
  //     <br/>
  //     <Icon name='envira' />
  //     {props.card.co2_savings} lbs Carbon Dioxide Saved
  //     <br/>
  //     <Icon name='plus square outline'/>
  //     {props.card.score} Points
  //     <br/>
  //     {determineIfComplete()
  //     }
  //   </a>
  //   </React.Fragment>
  //   }
  // />
)
}

const mapDispatchToProps = dispatch => ({
  completeCard: (card) => {dispatch(completeCard(card))}
})

export default connect(null, mapDispatchToProps)(DashboardCard)
