import React from 'react'
import { Icon } from 'semantic-ui-react'
import DetermineNumDollarSigns from './DetermineNumDollarSigns'


const CreateIcons = (props) => {
  return(
  <React.Fragment>
  <br/>
  <Icon name='dollar sign' />
  {props.card.dollar_savings * props.item} Saved per Year
  <br/>
  <Icon name='plus square outline'/>
  {props.card.score * props.item} Windr Points
  <br/>
  Upfront Cost: <DetermineNumDollarSigns upfrontCost={props.card.upfront_cost}/>
  <br/><br/>
  </React.Fragment>)
}

export default CreateIcons
