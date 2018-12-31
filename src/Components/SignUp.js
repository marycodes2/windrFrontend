import React from 'react'
import { Form,  Header, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createAccount } from '../actions/simpleAction'
import { Link } from 'react-router-dom'

class SignUp extends React.Component {

  state = {
    name: "",
    username: "",
    password: "",
    zipcode: "",
    avatar: "Heart"
  }

  avatarOptions = () => {
    let avatarOptions = [
  {
    text: 'Anti-Oil',
    value: 'Anti-Oil',
    image: { avatar: true, src: require('../images/avatars/Anti-Oil.jpg') },
  },
  {
    text: 'Heart',
    value: 'Heart',
    image: { avatar: true, src: require('../images/avatars/Heart.jpg') },
  },
  {
    text: 'Mountains',
    value: 'Mountains',
    image: { avatar: true, src: require('../images/avatars/Mountains.jpg') },
  },
  {
    text: 'Solar',
    value: 'Solar',
    image: { avatar: true, src: require('../images/avatars/Solar.jpg') },
  },
  {
    text: 'Sun',
    value: 'Sun',
    image: { avatar: true, src: require('../images/avatars/Sun.jpg') },
  },
  {
    text: 'Tree',
    value: 'Tree',
    image: { avatar: true, src: require('../images/avatars/Tree.jpg') },
  },
  {
    text: 'Waterfall',
    value: 'Waterfall',
    image: { avatar: true, src: require('../images/avatars/Waterfall.jpg') },
  }]

  return avatarOptions

  }

  handleSubmit = () => {
    let formData = {
      name: this.state.name,
      zipcode: parseInt(this.state.zipcode),
      username: this.state.username,
      password: this.state.password,
      avatar: this.state.avatar
    }
    this.props.createAccount(formData)
  }


  render() {
    return(
      <div
        id="signup">
        <Header as='h2'>
          <br/>
          <Icon name='settings' />
          <Header.Content>
            Create Windr Account
          </Header.Content>
        </Header>
        <br></br>
      <Form>
        <Form.Group>
          <Form.Input required width={6} placeholder="Name" label='Name' name="name" onChange={(event) => {this.setState({name: event.target.value})}}/>
        </Form.Group>
        
        <Form.Group>
          <Form.Input type="number" width={6} required placeholder="Zipcode" label='Zip Code' name="Zipcode" onChange={(event) => {this.setState({zipcode: event.target.value})}}/>
        </Form.Group>

        <Form.Group>
          <Form.Input required width={6} placeholder="Username" label='Username' name="username" onChange={(event) => {this.setState({username: event.target.value})}}/>
        </Form.Group>

        <Form.Group>
          <Form.Input required width={6} type="password" placeholder="Password" label='Password' name="password" onChange={(event) => {this.setState({password: event.target.value})}}/>
        </Form.Group>

        <Form.Group>
          <Form.Dropdown required placeholder='Heart' width={6} label='Avatar' fluid selection options={this.avatarOptions()} onChange={(event) => {this.setState({avatar: event.target.innerText})}} />
        </Form.Group>

          <Button type='submit' onClick={this.handleSubmit}>Submit</Button>

      </Form>
      <br></br>
      <h1>-OR-</h1>
      <br></br>
      <Button as={Link} to='/login'>Log in to your Account</Button>
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
