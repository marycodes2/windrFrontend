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

function createAccount(formData) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: formData.username,
        password: formData.password,
        name: formData.name,
        access_type: 'user',
        avatar: 'https://images-na.ssl-images-amazon.com/images/I/A15dQM39ELL._CR0,0,3840,2880_._SL1000_.jpg'
      }
    })
  })
    .then(res => res.json())
    .then(data => dispatch(createdAccount(data)))
  }
}

function logIn(formData) {
  console.log("hit the action", formData)
  return dispatch => {
    fetch('http://localhost:3000/api/v1/login', {
      method: "POST",
      headers: {
        "Content-type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({user: formData})

      })
      .then(res=>res.json())
      // Still need to set up the current user!
      .then(data => dispatch(loggedIn(data)))
  }
}

function createdAccount(userDataHash) {
  if (!!userDataHash.jwt) {
    return {type: "SET_TOKEN", userDataHash}
  }
  else {
    alert("This username already exists. Please select a unique username.")
    return {type: "DID_NOT_CREATE_ACCOUNT", userDataHash}
  }
}

function loggedIn(userDataHash) {
  if (!!userDataHash.jwt) {
    return {type: "SET_TOKEN", userDataHash}
  }
  else {
    alert("Incorrect username and/or password")
    return {type: "DID_NOT_LOG_IN", userDataHash}
  }
}

function settingUser(token) {
  return dispatch => {
  fetch('http://localhost:3000/api/v1/profile', {
    method: "GET",
    headers: {
      'Authentication' : `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => dispatch(setUser(data)))
  }
}

function setUser(user) {
  return {type: "SET_USER", user}
}


export { fetchedMyCards, fetchedAllCards, fetchCards, addCardToMyCards, completeCard, addCardToUserCards, createAccount, logIn, settingUser}
