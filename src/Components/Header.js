import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { connect } from 'react-redux'


class Header extends React.Component {
  render(){
  return(
    <div
      className={`ui inverted ${this.props.color} menu navbar`}>
      <a className="item">
        <h2 className="ui header">
          <i className= 'envira icon'></i>
          <div className="content">Windr</div>
          <div className="sub header">Swipe 4 Energy</div>
        </h2>
      </a>
      <Link className="item ui header" to='/'>Home</Link>
      <NavLink className="item ui header" to='/dashboard'>Dashboard</NavLink>
    </div>
  )
  }
}

export default connect()(Header)
