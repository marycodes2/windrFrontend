function fetchedAllCards(cards){
  return {type: "FETCH_ALL_CARDS", cards}
}

function fetchedMyCards(cardData){
  return {type: "FETCH_MY_CARDS", cardData}
}

function fetchCards() {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/cards')
    .then(res => res.json())
    .then(data => dispatch(fetchedAllCards(data)))
    .then(fetch(`http://localhost:3000/api/v1/users/${1}`)
    .then(result => result.json())
    .then(cardData => dispatch(fetchedMyCards(cardData))))
  }
}

function completedCard(data) {
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

function addedCardToUserCards(addedCard) {
  return {type: "ADD_CARD_TO_USER_CARDS", addedCard}
}

function addCardToUserCards(card, liked) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/user_cards', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: 1,
        card_id: card.id,
        completed: false,
        expired: false,
        liked: liked
      })
    })
    .then(res => res.json())
    .then(data => dispatch(addedCardToUserCards(data)))
  }
}

function addCardToMyCards(card) {
  return {type: "ADD_TO_MY_CARDS", card}
}

export { fetchedMyCards, fetchedAllCards, fetchCards, addCardToMyCards, completeCard, addCardToUserCards}
