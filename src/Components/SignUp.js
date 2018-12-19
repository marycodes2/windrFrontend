import React from 'react'
import { Form, Input, Header, Icon, Image, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createAccount } from '../actions/simpleAction'

class SignUp extends React.Component {

  state = {
    name: "",
    username: "",
    password: ""
  }

  handleSubmit = () => {
    let formData = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password
    }
    this.props.createAccount(formData)
  }


  render() {
    return(
      <div>
        <Header as='h2'>
          <Icon name='settings' />
          <Header.Content>
            Create Windr Account
          </Header.Content>
        </Header>
        <br></br>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths={2}>

          <Form.Input required placeholder="Name" label='Name' name="name" onChange={(event) => {this.setState({name: event.target.value})}}/>
          <Form.Input required placeholder="Username" label='Username' name="username" onChange={(event) => {this.setState({username: event.target.value})}}/>
          <Form.Input required type="password" placeholder="Password" label='Password' name="password" onChange={(event) => {this.setState({password: event.target.value})}}/>

      <Button type='submit'>Submit</Button>
      </Form.Group>
      </Form>
      <br></br>
      <br></br>
      <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7ZgI6nQMnITAGgaOvboldvLE7BruEsXITrb4nw__gqXejS6L7yg' size='medium' rounded />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createAccount: (formData) => {dispatch(createAccount(formData))}
  }
}

export default connect(null, mapDispatchToProps)(SignUp)
