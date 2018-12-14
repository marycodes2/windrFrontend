import React from 'react'
import { Card, Icon } from 'semantic-ui-react'



export default class WindrCard extends React.Component {
  render(){
  return(
    <Card
      onClick={() => this.props.respondToClick(this.props.card.id)}
      className="ui centered card"
      image={this.props.card.image}
      header={this.props.card.name}
      meta=''
      description={this.props.card.description}
      extra={
      <div>
      <a>
        <Icon name='dollar sign' />
        {this.props.card.dollar_savings* 5} Saved Over 5 Years
        <br/>
        <Icon name='dollar sign' />
        {this.props.card.upfront_cost} Upfront Cost
        <br/>
        <Icon name='envira' />
        {this.props.card.co2_savings} lbs Carbon Dioxide Saved
        <br/>
        <Icon name='plus square outline'/>
        {this.props.card.score} Points
      </a>
      </div>
      }
    />
  )
}
}
