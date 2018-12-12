import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const extra = (
  <a>
    <Icon name='dollar sign' />
    1.76 Saved
  </a>
)

const WindrCard = () => {
  return(
    <Card
      className="ui centered card"
      image='https://images.homedepot-static.com/productImages/589478b9-7f77-41ac-8aa8-6af8050a9342/svn/philips-led-bulbs-457069-64_1000.jpg'
      header='ENERGY STAR Light Bulbs'
      meta='Energy Efficiency'
      description='Replace incandescent light bulbs with ENERGY STAR bulbs'
      extra={extra}
    />
  )
}


export default WindrCard
