import React from 'react'
import { Form, Header, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import CreateIcons from './CreateIcons'

class SingleEntryForm extends React.Component {

  state = {
    items: 1
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
          {this.renderIfInputs()}
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
