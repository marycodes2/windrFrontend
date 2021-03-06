import React from 'react'
import { Form, Input, Header, Icon, Image, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addBulbToUser } from '../actions/simpleAction'
import DetermineNumDollarSigns from './DetermineNumDollarSigns'
import CreateIcons from './CreateIcons'


class LightBulbForm extends React.Component {

  // saving for later
  // <Icon name='star' />
  // {this.props.card.stars}/5 Energy-Saving Stars

  state = {
    bulbs: 0
  }

  handleSubmit = () => {
    this.props.resToClick()
    this.props.completeCard()
    let bulbs = this.state.bulbs
    let points = this.props.card.score * bulbs
    let userId = this.props.currentUser.id
    this.props.addBulbToUser(bulbs, points, userId)
  }

  render() {
    return(
      <div>
      <Header as='h4'>How many bulbs did you upgrade to LEDs?</Header>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths={2}>
          <Form.Input type="number" required placeholder='0' name="num" onChange={(event) => {this.setState({bulbs: event.target.value})}}/>
          <Button color='green' type='submit'>I completed this action</Button>
          <Button color='grey' onClick={this.props.resToClick}>I have not yet completed this action</Button>
      </Form.Group>
      </Form>
      <CreateIcons card={this.props.card} item={this.state.bulbs} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reducer.currentUser
  }
}

const mapDispatchToProps = dispatch => ({
  addBulbToUser: (bulbs, points, userId) => {dispatch(addBulbToUser(bulbs, points, userId))}
})

export default connect(mapStateToProps, mapDispatchToProps)(LightBulbForm)
