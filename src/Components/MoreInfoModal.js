import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { completeCard, addWindowsToUser, addBulbToUser, addRefrigeratorsToUser } from '../actions/simpleAction'
import { connect } from 'react-redux'
import SingleEntryForm from '../CardModalForms/SingleEntryForm'


class MoreInfoModal extends React.Component {
  state = {
    open: false
  }

  close = () => this.setState({ open: false })

  determineUserCard = () => {
    let userCard = this.props.userCards.filter(userCard => userCard.card_id === this.props.card.id)
    return userCard
  }

  completeCard = () => {
    this.props.completeCard(this.props.userCard, this.props.currentUser, this.determineUserCard())
  }

  determineWhichFormToUse = () => {
    switch (this.props.card.id) {
      case 1:
      // Light Bulb
        return <SingleEntryForm
          card={this.props.card}
          resToClick={this.close}
          completeCard={this.completeCard}
          slogan={"How many bulbs did you upgrade to LEDs?"}
          addItemsToUser={(bulbs, points, userId) => this.props.addBulbToUser(bulbs, points, userId)}
          />
      // Window
      case 2:
        return <SingleEntryForm
          card={this.props.card}
          resToClick={this.close}
          completeCard={this.completeCard}
          slogan={"How many windows did you upgrade?"}
          addItemsToUser={(windows, points, userId) => this.props.addWindowsToUser(windows, points, userId)}
          />
        // Refrigerator
      case 3:
        return <SingleEntryForm
          card={this.props.card}
          resToClick={this.close}
          completeCard={this.completeCard}
          slogan={"How many refrigerators did you upgrade?"}
          addItemsToUser={(refrigerators, points, userId) => this.props.addRefrigeratorsToUser(refrigerators, points, userId)}
          />
  }
}

  render() {
    return(
      <Modal
        trigger={
          <Button className="ui bottom attached button"
            onClick={() => this.setState({open:true})}>
            <i className="add icon"></i>
            More Info
          </Button>}
        open={this.state.open}
        onClose={this.close}
        onEscape={this.close}>
        <Modal.Content>
          {this.determineWhichFormToUse()}
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reducer.currentUser,
    myCards: state.reducer.myCards,
    userCards: state.reducer.userCards
  }
}

const mapDispatchToProps = dispatch => ({
  completeCard: (card, currentUser, userCard) => {dispatch(completeCard(card, currentUser, userCard))},
  addWindowsToUser: (windows, points, userId) => {dispatch(addWindowsToUser(windows, points, userId))},
  addBulbToUser: (bulbs, points, userId) => {dispatch(addBulbToUser(bulbs, points, userId))},
  addRefrigeratorsToUser: (bulbs, points, userId) => {dispatch(addRefrigeratorsToUser(bulbs, points, userId))}
})


export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoModal)
