import React from 'react'
import { Icon } from 'semantic-ui-react'
import DetermineNumStars from './DetermineNumStars'


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
  Upfront Cost: <DetermineNumStars icon={"dollar"} measurement={props.card.upfront_cost}/>
  <br/>
  Envira-Stars: <DetermineNumStars icon={"envira"} measurement={props.card.stars}/>
  <br/><br/>
  </React.Fragment>)
}

export default CreateIcons
