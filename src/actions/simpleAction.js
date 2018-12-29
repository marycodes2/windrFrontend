function fetchedAllCards(cards){
  return {type: "FETCH_ALL_CARDS", cards}
}

function fetchedMyCards(cardData){
  return {type: "FETCH_MY_CARDS", cardData}
}

function fetchCards(data) {
  if (data.user) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/cards')
    .then(res => res.json())
    .then(data => dispatch(fetchedAllCards(data)))
    .then(fetch(`http://localhost:3000/api/v1/users/${data.user.id}`)
    .then(result => result.json())
    .then(cardData => dispatch(fetchedMyCards(cardData))))
  }
}
}

function completedCard(data) {
  return {type: "COMPLETE_CARD", data}
}

function completeCard(card, currentUser, userCard, total_score, total_dollar_savings) {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/user_cards/${userCard[0].id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        completed: true,
        total_windr_score: total_score,
        total_dollar_savings: total_dollar_savings,
        // card_id: card.id,
        user_id: currentUser.id
      })
    })
    .then(res => res.json())
    .then(data => dispatch(completedCard(data)))
  }
}

function addedCardToUserCards(addedCard) {
  return {type: "ADD_CARD_TO_USER_CARDS", addedCard}
}

function addCardToUserCards(card, liked, userCard) {
  // console.log("CARD IS", card)
  return dispatch => {
    fetch('http://localhost:3000/api/v1/user_cards', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: userCard.id,
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
        zipcode: formData.zipcode,
        access_type: 'user',
        avatar: formData.avatar,
        score: 0
      }
    })
  })
    .then(res => res.json())
    .then(data => dispatch(createdAccount(data)))
  }
}

function logIn(formData) {
  // console.log("hit the action", formData)
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

function createdAccount(user) {
  if (!!user.jwt) {
    return {type: "SET_TOKEN", user}
  }
  else {
    alert("This username already exists. Please select a unique username.")
    return {type: "DID_NOT_CREATE_ACCOUNT", user}
  }
}

function loggedIn(user) {
  if (!!user.jwt) {
    return {type: "SET_TOKEN", user}
  }
  else {
    alert("Incorrect username and/or password")
    return {type: "DID_NOT_LOG_IN", user}
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
  .then(data => {
    if (!data.error) {
    dispatch(fetchCards(data))
    dispatch(setUser(data))}
  })
  }
}

function setUser(user) {
  return {type: "SET_USER", user}
}

function logOut() {
  return {type: "RESET_STATE"}
}

function addBulbToUser(bulbs, points, userId) {
  return (dispatch, getState) => {
    // console.log("STATE:", getState().reducer.currentUser.score)
    let oldPoints = getState().reducer.currentUser.score
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        upgraded_bulbs: bulbs,
        score: oldPoints + points
      })
    })
    .then(res => res.json())
    .then(userData => dispatch(addPoints(userData)))
  }
}

function addPoints(userData) {
  return {type: "ADD_POINTS", userData}
}

function getUsers() {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/users')
    .then(res => res.json())
    .then(data => dispatch(createUsersHash(data)))
  }
}

function createUsersHash(data) {
  let usersHash = {}
  data.forEach(user => (
    usersHash[user.username] = user.score))
  return {type: 'CREATE_USERS_HASH', data:[usersHash, data]}
}

function addWindowsToUser(windows, points, userId) {
  return (dispatch, getState) => {
    let oldPoints = getState().reducer.currentUser.score
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        upgraded_windows: windows,
        score: oldPoints + points
      })
    })
    .then(res => res.json())
    .then(userData => dispatch(addPoints(userData)))
  }
}

function addPointsToUser(points, userId) {
  return (dispatch, getState) => {
    let oldPoints = getState().reducer.currentUser.score
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        score: oldPoints + points
      })
    })
    .then(res => res.json())
    .then(userData => dispatch(addPoints(userData)))
  }
}

function addMilesToUser(miles, points, userId) {
  return (dispatch, getState) => {
    let oldPoints = getState().reducer.currentUser.score
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        driving_miles_saved_in_week: miles,
        score: oldPoints + points
      })
    })
    .then(res => res.json())
    .then(userData => dispatch(addPoints(userData)))
  }
}

function addMonitorsToUser(monitors, points, userId) {
  return (dispatch, getState) => {
    let oldPoints = getState().reducer.currentUser.score
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        num_sleep_monitors: monitors,
        score: oldPoints + points
      })
    })
    .then(res => res.json())
    .then(userData => dispatch(addPoints(userData)))
  }
}

export { fetchedMyCards, fetchedAllCards, fetchCards, addCardToMyCards, completeCard, addCardToUserCards, createAccount, logIn, settingUser, logOut, addBulbToUser, getUsers, addWindowsToUser, addPointsToUser, addMilesToUser, addMonitorsToUser}
