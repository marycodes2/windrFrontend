import React from 'react'
import {Link} from 'react-router-dom'

const Header = (props) => {
  return(
    <div
      className={`ui inverted ${props.color} menu navbar`}>
      <a className="item">
        <h2 className="ui header">
          <i className= 'envira icon'></i>
          <div className="content">Windr</div>
          <div className="sub header">Swipe 4 Energy</div>
        </h2>
      </a>
      
    </div>
  )
}

export default Header
