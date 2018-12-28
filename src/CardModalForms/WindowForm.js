import React from 'react'
import { Form, Input, Header, Icon, Image, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { addWindowsToUser } from '../actions/simpleAction'
import DetermineNumDollarSigns from './DetermineNumDollarSigns'
import CreateIcons from './CreateIcons'

class WindowForm extends React.Component {

  state = {
    windows: 0
  }

  handleSubmit = () => {
    this.props.resToClick()
    this.props.completeCard()
    let windows = this.state.windows
    let points = this.props.card.score * windows
    let userId = this.props.currentUser.id
    this.props.addWindowsToUser(windows, points, userId)
  }

  render() {
    return(
      <div>
      <Header as='h4'>How many windows did you upgrade?</Header>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths={2}>
          <Form.Input type="number" required placeholder='0' name="num" onChange={(event) => {this.setState({windows: event.target.value})}}/>
          <Button color='green' type='submit'>I completed this action</Button>
          <Button color='grey' onClick={this.props.resToClick}>I have not yet completed this action</Button>
      </Form.Group>
      </Form>
      <CreateIcons card={this.props.card} item={this.state.windows} />
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
  addWindowsToUser: (windows, points, userId) => {dispatch(addWindowsToUser(windows, points, userId))}
})

export default connect(mapStateToProps, mapDispatchToProps)(WindowForm)
