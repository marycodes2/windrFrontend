import React from 'react'
import { Form, Header, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import CreateIcons from './CreateIcons'

class SingleEntryForm extends React.Component {

  state = {
    q1Consumption: 0,
    q2Consumption: 0,
    q3Consumption: 0,
    q4Consumption: 0
  }

  handleSubmit = () => {
    let items = this.state.items
    let total_dollar_savings = this.state.items * this.props.card.dollar_savings
    let points = this.props.card.score * items
    let userId = this.props.currentUser.id
    this.props.resToClick()
    this.props.completeCard(points, total_dollar_savings)
    if (this.props.inputs) {
      this.props.addItemsToUser(items, points, userId)
    }
    else {
      this.props.addItemsToUser(points, userId)
    }

  }

  renderIfInputs = () => {
      if (this.props.inputs) {
      return <Form.Input type="number" required placeholder='1' name="num" onChange={(event) => {this.setState({items: event.target.value})}}/> }
    }
  render() {
    return(
      <div>
      <Header as='h4'>{this.props.slogan}</Header>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths={2}>
          <Form.Input type="number" label="Please enter an average monthly electricity bill between January-March" required placeholder='100' name="num" onChange={(event) => {this.setState({q1Consumption: event.target.value})}}/>
          <Form.Input type="number" label="Please enter an average monthly electricity bill between April-June" required placeholder='100' name="num" onChange={(event) => {this.setState({q2Consumption: event.target.value})}}/>
          <Form.Input type="number" label="Please enter an average monthly electricity bill between July-September" required placeholder='100' name="num" onChange={(event) => {this.setState({q3Consumption: event.target.value})}}/>
          <Form.Input type="number" label="Please enter an average monthly electricity bill between September-December" required placeholder='100' name="num" onChange={(event) => {this.setState({q4Consumption: event.target.value})}}/>    
        </Form.Group>
        <Form.Group>
          <Button color='green' type='submit'>I completed this action</Button>
          <Button color='grey' onClick={this.props.resToClick}>I have not yet completed this action</Button>
      </Form.Group>
      </Form>
      <CreateIcons card={this.props.card} item={this.state.items} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reducer.currentUser
  }
}

export default connect(mapStateToProps)(SingleEntryForm)
