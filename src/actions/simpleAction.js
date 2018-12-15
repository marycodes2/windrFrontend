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

function addCardsToMyCards(card) {
  return {type: "ADD_TO_MY_CARDS", card}
}

function completedCard(data) {
  console.log("logging submitted data in simple action:",data)
  return {type: "COMPLETE_CARD", data}
}

function completeCard(card) {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/user_cards/${card.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        completed: true,
        card_id: card.id,
        user_id: 1
      })
    })
    .then(res => res.json())
    .then(data => dispatch(completedCard(data)))
  }
}

export { fetchedMyCards, fetchedAllCards, fetchCards, addCardsToMyCards, completeCard }
