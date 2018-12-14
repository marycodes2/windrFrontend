// import {combineReducers} from "redux"

export default (state = {allCards: [], myCards: []}, action) => {
 switch (action.type) {
  case 'FETCHED_ALL_CARDS':
   return {...state, allCards: action.cards}
  case 'FETCHED_MY_CARDS':
    return {...state, myCards: action.cards}
  case 'ADD_TO_MY_CARDS':
      return {...state, myCards: [...state.myCards, action.card]}
  default:
   return state
 }
}
