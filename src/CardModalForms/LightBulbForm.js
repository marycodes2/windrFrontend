import React from 'react'
import { Form, Input, Header, Icon, Image, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addBulbToUser } from '../actions/simpleAction'

class LightBulbForm extends React.Component {

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
      <h4>How many bulbs did you upgrade to LEDs?</h4>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths={2}>

          <Form.Input type="number" required placeholder='0' label='Number of Bulbs' name="num" onChange={(event) => {this.setState({bulbs: event.target.value})}}/>

      <Button color='green' type='submit'>I completed this action</Button>

      <Button color='grey' onClick={this.props.resToClick}>I have not yet completed this action</Button>
      </Form.Group>
      </Form>
      <br></br>
      <Icon name='dollar sign' />
      {this.props.card.dollar_savings* 5 * this.state.bulbs} Saved Over 5 Years
      <br/>
      <Icon name='dollar sign' />
      {this.props.card.upfront_cost * this.state.bulbs} Upfront Cost
      <br/>
      <Icon name='plus square outline'/>
      {this.props.card.score * this.state.bulbs} Windr Points
      <br></br>
      <Icon name='star' />
      {this.props.card.stars}/5 Energy-Saving Stars
      <br/>
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
