import React from 'react'
import { Form, Input, Header, Icon, Image, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import CreateIcons from './CreateIcons'

class SingleEntryForm extends React.Component {

  state = {
    items: 0
  }

  handleSubmit = () => {
    this.props.resToClick()
    let items = this.state.items
    let total_dollar_savings = this.state.items * this.props.card.dollar_savings
    let points = this.props.card.score * items
    let userId = this.props.currentUser.id
    this.props.completeCard(points, total_dollar_savings)
    this.props.addItemsToUser(items, points, userId)
  }

  render() {
    return(
      <div>
      <Header as='h3'>{this.props.slogan}</Header>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths={2}>
          <Form.Input type="number" required placeholder='0' name="num" onChange={(event) => {this.setState({items: event.target.value})}}/>
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
