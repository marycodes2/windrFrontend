// import {combineReducers} from "redux"

export default (state = {allCards: [], myCards: [], userCards: []}, action) => {
 switch (action.type) {
  case 'FETCH_ALL_CARDS':
   return {...state, allCards: action.cards}
  case 'FETCH_MY_CARDS':
    return {...state, myCards: action.cardData.cards, userCards: action.cardData.user_cards}
  case 'ADD_TO_MY_CARDS':
      return {...state, myCards: [...state.myCards, action.card]}
  case "ADD_CARD_TO_USER_CARDS":
    return {...state, userCards: [...state.userCards, action.addedCard]}
  case 'COMPLETE_CARD':
      let newUserCards = state.userCards.map(card => {
        if (card.id === action.data.id){
          return {
            ...card,
            completed: true
          }
        } else {
            return card
          }
      })
      return {...state, userCards: newUserCards}
  default:
   return state
 }
}
