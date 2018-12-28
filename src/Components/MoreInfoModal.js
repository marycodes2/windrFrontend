import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import LightBulbForm from '../CardModalForms/LightBulbForm'
import { completeCard } from '../actions/simpleAction'
import { connect } from 'react-redux'


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
        return <LightBulbForm card={this.props.card} resToClick={this.close} completeCard={this.completeCard}/>
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
        <Modal.Header>Provide the following information to complete this card: </Modal.Header>
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
  completeCard: (card, currentUser, userCard) => {dispatch(completeCard(card, currentUser, userCard))}
})


export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoModal)
