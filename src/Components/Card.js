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
    let innerWidthRatio = window.innerWidth / 4
    let leftBound = innerWidthRatio
    let rightBound = window.innerWidth - innerWidthRatio


    if (positionX > rightBound) {
      this.props.respondToSwipe(this.props.card, "right")
    } else if (positionX < leftBound) {
      this.props.respondToSwipe(this.props.card, "left")
    }
    else {
      this.setState({endingPosition: positionX})

      // target.style.webkitTransform =
      // // target.style.transform =
      // 'translate(' + 0 + 'px, ' + 0 + 'px)';
    }
  }

  render(){
    return(
    <Card
      className="ui centered raised card"
      id={`card-${this.props.card.id}`}
      image={require(`../images/${this.props.card.image}.jpg`)}
      header={this.props.card.name}
      meta=''
      description={this.props.card.description}
      extra={
      <React.Fragment>
      <div>
        <Icon name='plus square outline'/>
        {this.props.card.score} points per action
      </div>
      </React.Fragment>
      }

    />
  )
}
}
