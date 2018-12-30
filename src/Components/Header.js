import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon, Button } from 'semantic-ui-react'
import { logOut } from '../actions/simpleAction'



class Header extends React.Component {

  showLogoutButton = () => {
    if (this.props.currentUser) {
      return <NavLink
        onClick={() => this.props.logOut()}
        className="item ui header"
        to='/login'
        >Log Out</NavLink>
    }
  }
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
      <Link className="item ui header" to='/'>Swipe</Link>
      <Link className="item ui header" to='/dashboard'>Dashboard</Link>
      {this.showLogoutButton()}
    </div>
  )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reducer.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (token) => {dispatch(logOut(token))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
