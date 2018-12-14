import React from 'react'
import DashboardCard from '../Components/DashboardCard'
import { connect } from 'react-redux'


class DashboardContainer extends React.Component {

  render(){
    console.log('rendering dashboard')
    return(
      <div>
        <h2>Queue</h2>
          {this.props.myCards.map(card =>
            <DashboardCard card={card} key={card.id}/> )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    myCards: state.reducer.myCards
  }
}

export default connect(mapStateToProps)(DashboardContainer)
