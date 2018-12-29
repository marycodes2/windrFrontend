import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { completeCard, addWindowsToUser, addBulbToUser, addPointsToUser, addMilesToUser, addMonitorsToUser } from '../actions/simpleAction'
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

  completeCard = (total_score, total_dollar_savings) => {
    this.props.completeCard(this.props.userCard, this.props.currentUser, this.determineUserCard(), total_score, total_dollar_savings)
  }

  determineWhichFormToUse = () => {
    switch (this.props.card.id) {
      case 1:
      // Light Bulb
        return <SingleEntryForm
          card={this.props.card}
          resToClick={this.close}
          completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
          slogan={"How many bulbs did you upgrade to LEDs?"}
          inputs={true}
          addItemsToUser={(bulbs, points, userId) => this.props.addBulbToUser(bulbs, points, userId)}
          />
      // Window
      case 2:
        return <SingleEntryForm
          card={this.props.card}
          resToClick={this.close}
          completeCard={this.completeCard}
          inputs={true}
          slogan={"How many windows did you upgrade?"}
          addItemsToUser={(windows, points, userId) => this.props.addWindowsToUser(windows, points, userId)}
          />
        // Refrigerator
      case 3:
        return <SingleEntryForm
          card={this.props.card}
          resToClick={this.close}
          completeCard={this.completeCard}
          inputs={false}
          slogan={"Did you upgrade your refrigerator?"}
          addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
          />
        // Drive Less
      case 4:
        return <SingleEntryForm
          card={this.props.card}
          resToClick={this.close}
          inputs={true}
          completeCard={this.completeCard}
          slogan={"How many fewer miles did you drive this week?"}
          addItemsToUser={(miles, points, userId) => this.props.addMilesToUser(miles, points, userId)}
          />
        // Monitors
        case 5:
          return <SingleEntryForm
            card={this.props.card}
            resToClick={this.close}
            completeCard={this.completeCard}
            inputs={true}
            slogan={"On how many monitors did you enable sleep mode?"}
            addItemsToUser={(monitors, points, userId) => this.props.addMonitorsToUser(monitors, points, userId)}
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
  completeCard: (card, currentUser, userCard, total_score, total_dollar_savings) => {dispatch(completeCard(card, currentUser, userCard, total_score, total_dollar_savings))},
  addPointsToUser: (points, userId) => {dispatch(addPointsToUser(points, userId))},
  addWindowsToUser: (windows, points, userId) => {dispatch(addWindowsToUser(windows, points, userId))},
  addBulbToUser: (bulbs, points, userId) => {dispatch(addBulbToUser(bulbs, points, userId))},
  addMilesToUser: (miles, points, userId) => {dispatch(addMilesToUser(miles, points, userId))},
  addMonitorsToUser: (monitors, points, userId) => {dispatch(addMonitorsToUser(monitors, points, userId))}
})


export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoModal)
