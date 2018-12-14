import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const DashboardCard = (props) => {
  return(
  <Card
    className="ui centered card"
    id={`card-${props.card.id}`}
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
    </a>
    </div>
    }
  />
)
}

export default DashboardCard
