import React from 'react'
import { Form, Input, Header, Icon, Image, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logIn } from '../actions/simpleAction'

class Login extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleSubmit = () => {
    // console.log("attempting to log in with", this.state.username, this.state.password)
    let formData = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.logIn(formData)
    // this.props.createAccount(formData)
  }

  render() {
    return(
      <div
        id='login'>
        <Header as='h2'>
          <Icon name='settings' />
          <Header.Content>
            Welcome to Windr!
            <br></br>
            Login to Your Account to View Your Profile
          </Header.Content>
        </Header>
        <br></br>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>

          <Form.Input width={6} required placeholder="Username" label='Username' name="username" onChange={(event) => {this.setState({username: event.target.value})}}/>
        </Form.Group>
        <Form.Group>
          <Form.Input width={6} required type="password" placeholder="Password" label='Password' name="password" onChange={(event) => {this.setState({password: event.target.value})}}/>
        </Form.Group>
      <Button type='submit'>Login</Button>
      </Form>
      <h1>-OR-</h1>
    <Button as={Link} to='/signup'>Create an Account</Button>
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logIn: (formData) =>{dispatch(logIn(formData))}
})

export default connect(null, mapDispatchToProps)(Login)
