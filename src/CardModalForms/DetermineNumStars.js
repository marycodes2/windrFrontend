import React from 'react'
import { Icon } from 'semantic-ui-react'


const DetermineNumStars = (props) => {
  let returnValue = []
  let i = 0
  while (i < props.measurement) {
    returnValue.push(<Icon color="green" bold fitted name={props.icon} />)
    i++
  }
  let j = returnValue.length
  while (j < 5) {
    returnValue.push(<Icon color="grey" fitted name={props.icon} />)
    j++
  }
  return (returnValue)
}

export default DetermineNumStars
