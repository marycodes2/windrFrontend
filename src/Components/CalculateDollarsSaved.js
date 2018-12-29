import React from 'react'
import { connect } from 'react-redux'

const getSum = (total, num) => {
  return total + num
}

const CalculateDollarsSaved = (props) => {
    let allCardsSum = props.userCards.map(userCard => userCard.total_dollar_savings)
    let sum = allCardsSum.reduce(getSum, 0)
    return(<React.Fragment>
      ${sum}
    </React.Fragment>)
}



const mapStateToProps = state => {
  return {
    myCards: state.reducer.myCards,
    //usercards are all of the current user's cards
    userCards: state.reducer.userCards,
    currentUser: state.reducer.currentUser,
    usersHash: state.reducer.usersHash,
    allUsers: state.reducer.allUsers
  }
}

export default connect(mapStateToProps)(CalculateDollarsSaved)
