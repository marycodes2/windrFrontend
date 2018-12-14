function fetchedAllCards(cards){
  return {type: "FETCHED_ALL_CARDS", cards}
}

function fetchedMyCards(cards){
  return {type: "FETCHED_MY_CARDS", cards}
}

function fetchCards() {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/cards')
    .then(res => res.json())
    .then(data => dispatch(fetchedAllCards(data)))
    .then(fetch(`http://localhost:3000/api/v1/users/${1}`)
    .then(result => result.json())
    .then(cardData => dispatch(fetchedMyCards(cardData.cards))))
  }
}

export { fetchedMyCards, fetchedAllCards, fetchCards }
