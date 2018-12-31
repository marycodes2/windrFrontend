import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon, Responsive, Menu, Header } from 'semantic-ui-react'
import { logOut } from '../actions/simpleAction'



class Navbar extends React.Component {

  showLogoutButton = () => {
    if (this.props.currentUser) {
      return <Link
        onClick={() => this.props.logOut()}
        className="item ui header"
        to='/login'
        >Log Out</Link>

    }
  }
  render(){
  return(
  <React.Fragment>
  <Responsive
     maxWidth={450}>
    <Menu
      className={'ui inverted grey menu navbar'}
      size='mini'
      fluid>
      <div
        id="mobileHeader">
        <Header>
          <Icon.Group size="large">
            <Icon name="envira" />
            <Icon corner="top right" name="heart" inverted/>
          </Icon.Group>
          <div className="content heading">Windr</div>
          <div
            className="sub header"
            id="mobileText">
            <i>Keeping the Lights Off</i></div>
        </Header>
      </div>
        <Link className="item ui header" to='/'>Swipe</Link>

        <Link className="item ui header" to='/dashboard'>Dashboard</Link>

        {this.showLogoutButton()}

    </Menu>
  </Responsive>


  <Responsive
     minWidth={451}>
    <div
      className={`ui inverted grey menu navbar`}>
      <div className="item">
        <h2 className="ui header">
          <Icon.Group size="large">
            <Icon name="envira" />
            <Icon corner="top right" name="heart" inverted/>
          </Icon.Group>
          <div className="content heading">Windr</div>
          <div className="sub header"><i>Keeping the Lights Off</i></div>
        </h2>
      </div>
      <Link className="item ui header" to='/'>Swipe</Link>
      <Link className="item ui header" to='/dashboard'>Dashboard</Link>
      {this.showLogoutButton()}
    </div>
  </Responsive>
  </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
