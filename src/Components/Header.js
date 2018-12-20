import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon, Button } from 'semantic-ui-react'
import { logOut } from '../actions/simpleAction'



class Header extends React.Component {
  render(){
  return(
    <div
      className={`ui inverted grey menu navbar`}>
      <a className="item">
        <h2 className="ui header">
          <Icon.Group size="large">
            <Icon name="envira" />
            <Icon corner="top right" name="heart" inverted color="white" />
          </Icon.Group>
          <div className="content heading">Windr</div>
          <div className="sub header"><i>Keeping the Lights Off</i></div>
        </h2>
      </a>
      <Link className="item ui header" to='/'>Home</Link>
      <NavLink className="item ui header" to='/dashboard'>Dashboard</NavLink>
      <Button
        onClick={() => this.props.logOut()}>Log Out</Button>
    </div>
  )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (token) => {dispatch(logOut(token))}
  }
}

export default connect(null, mapDispatchToProps)(Header)
