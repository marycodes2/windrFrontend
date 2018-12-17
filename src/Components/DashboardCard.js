import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { completeCard } from '../actions/simpleAction'
import { connect } from 'react-redux'


const DashboardCard = (props, completed) => {

  const determineIfComplete = () => {
    if (!props.completed) {
      return (<div><input
      type="checkbox"
      name="completed"
      onChange={() => props.completeCard(props.card)}
      ></input>
      <label for="completed"> Completed?</label>
      </div>)
    }
  }
  return(
  <Card
    className="ui centered card"
    image={props.card.image}
    header={props.card.name}
    meta=''
    description={props.card.description}
    extra={
    <div>
    <a>
      <Icon name='dollar sign' />
      {props.card.dollar_savings* 5} Saved Over 5 Years
      <br/>
      <Icon name='dollar sign' />
      {props.card.upfront_cost} Upfront Cost
      <br/>
      <Icon name='envira' />
      {props.card.co2_savings} lbs Carbon Dioxide Saved
      <br/>
      <Icon name='plus square outline'/>
      {props.card.score} Points
      <br/><br/>
      {determineIfComplete()}
    </a>
    </div>
    }
  />
)
}

const mapDispatchToProps = dispatch => ({
  completeCard: (card) => {dispatch(completeCard(card))}
})

export default connect(null, mapDispatchToProps)(DashboardCard)
