import React from 'react'
import { Icon } from 'semantic-ui-react'


const DetermineNumDollarSigns = (props) => {
  let returnValue = []
  let i = 0
  while (i < props.upfrontCost) {
    returnValue.push(<Icon color="green" bold fitted name='dollar' />)
    i++
  }
  let j = returnValue.length
  while (j < 5) {
    returnValue.push(<Icon color="grey" fitted name='dollar' />)
    j++
  }
  return (returnValue)
}

export default DetermineNumDollarSigns
