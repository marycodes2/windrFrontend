import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import interact from 'interactjs'

export default class WindrCard extends React.Component {

  componentDidMount() {
    interact(`#card-${this.props.card.id}`).draggable({
      inertia: true,
      onmove: this.dragMoveListener.bind(this),
      onend: this.dragMoveListenerEnd.bind(this)
    })
  }

  dragMoveListener = (event) => {
    // console.log(event.pageX,
    //             event.pageY)
    var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        // translate the element
    target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

  }

  dragMoveListenerEnd(event) {
    let positionX = event.pageX;
    let leftBound = -50
    let rightBound = window.innerWidth + 50

    if (positionX > rightBound) {
      this.props.respondToSwipe(this.props.card, "right")
    } else if (positionX < leftBound) {
      this.props.respondToSwipe(this.props.card, "left")
    }
    else {
      
      // target.style.webkitTransform =
      // // target.style.transform =
      // 'translate(' + 0 + 'px, ' + 0 + 'px)';
    }
  }

  render(){
    return(
    <Card
      className="ui centered card"
      id={`card-${this.props.card.id}`}
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
