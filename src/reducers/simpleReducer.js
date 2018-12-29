// import {combineReducers} from "redux"

export default (state = {allCards: [], myCards: [], userCards: [], currentUser: null, myCardsLoaded: false, allUsers: [], usersHash: {}}, action) => {
 switch (action.type) {
  case 'FETCH_ALL_CARDS':
   return {...state, allCards: action.cards}
  case 'FETCH_MY_CARDS':
    return {...state, myCards: action.cardData.cards, userCards: action.cardData.user_cards, myCardsLoaded: true}
  case 'ADD_TO_MY_CARDS':
      return {...state, myCards: [...state.myCards, action.card]}
  case "ADD_CARD_TO_USER_CARDS":
    return {...state, userCards: [...state.userCards, action.addedCard]}
  case 'COMPLETE_CARD':
    console.log("Data in COMPLETE_CARD", action.data)
      let newUserCards = state.userCards.map(card => {
        if (card.id === action.data.id){
          return {
            ...card,
            completed: true,
            total_windr_score: action.data.total_windr_score,
            total_dollar_savings: action.data.total_dollar_savings
          }
        } else {
            return card
          }
      })
      return {...state, userCards: newUserCards}
  case 'SET_TOKEN':
    localStorage.setItem('token', action.user.jwt)

    // commented the below line out, but might end up needing it?
    // return {currentUser: action.userDataHash.user}
  case 'SET_USER':
    // console.log("ACTION =", action)
    return {...state, currentUser: action.user.user}
  case 'RESET_STATE':
    localStorage.removeItem('token')
    return {allCards: [], myCards: [], userCards: [], currentUser: null}
  case 'CREATE_USERS_HASH':
    // console.log(action.data[1])
    return {...state, usersHash: action.data[0], allUsers: action.data[1]}
  case 'ADD_POINTS':
    console.log("Data in ADD_POINTS", action.userData)
    let newHash = state.usersHash[action.userData.username] = action.userData.score
    return {...state, currentUser: action.userData}
  default:
   return state
 }
}
