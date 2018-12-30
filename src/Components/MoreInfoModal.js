import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { completeCard, addWindowsToUser, addBulbToUser, addPointsToUser, addMilesToUser, addMonitorsToUser, addDegreesDecreasedToUser, addDegreesIncreasedToUser } from '../actions/simpleAction'
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
          completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
          inputs={true}
          slogan={"How many windows did you upgrade?"}
          addItemsToUser={(windows, points, userId) => this.props.addWindowsToUser(windows, points, userId)}
          />
        // Refrigerator
      case 3:
        return <SingleEntryForm
          card={this.props.card}
          resToClick={this.close}
          completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
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
          completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
          slogan={"How many fewer miles did you drive this week? Note: the below savings represent the amount of money saved if you sustained this reduction for the entire year!"}
          addItemsToUser={(miles, points, userId) => this.props.addMilesToUser(miles, points, userId)}
          />
        // Monitors
        case 5:
          return <SingleEntryForm
            card={this.props.card}
            resToClick={this.close}
            completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
            inputs={true}
            slogan={"On how many monitors did you enable sleep mode?"}
            addItemsToUser={(monitors, points, userId) => this.props.addMonitorsToUser(monitors, points, userId)}
            />
          //Trash
        case 6:
          return <SingleEntryForm
            card={this.props.card}
            resToClick={this.close}
            completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
            inputs={false}
            slogan={"Did you ...trash?"}
            addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
            />
          // Winter Heat
        case 7:
          return <SingleEntryForm
            card={this.props.card}
            resToClick={this.close}
            completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
            slogan={"How many degrees did you decrease your heat?"}
            inputs={true}
            addItemsToUser={(degrees, points, userId) => this.props.addDegreesDecreasedToUser(degrees, points, userId)}
            />
          // Clean Power
        case 8:
          return <SingleEntryForm
            card={this.props.card}
            resToClick={this.close}
            completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
            inputs={false}
            slogan={"Did you purchase clean power?"}
            addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
            />
          // Cold Water Wash
        case 9:
          return <SingleEntryForm
            card={this.props.card}
            resToClick={this.close}
            completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
            inputs={false}
            slogan={"Did you wash your clothes in cold water?"}
            addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
            />
          // Programmable Thermostat
        case 10:
          return <SingleEntryForm
            card={this.props.card}
            resToClick={this.close}
            inputs={false}
            completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
            slogan={"Did you purchase a programmable thermostat?"}
            addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
            />
          // Air Leaks
          case 11:
            return <SingleEntryForm
              card={this.props.card}
              resToClick={this.close}
              completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
              inputs={false}
              slogan={"Did you fix air leaks?"}
              addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
              />
            //Summer AC
            case 12:
              return <SingleEntryForm
                card={this.props.card}
                resToClick={this.close}
                completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
                slogan={"How many degrees did you increase your heat?"}
                inputs={true}
                addItemsToUser={(degrees, points, userId) => this.props.addDegreesIncreasedToUser(degrees, points, userId)}
                />
              //Recycle
            case 13:
              return <SingleEntryForm
                card={this.props.card}
                resToClick={this.close}
                completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
                inputs={false}
                slogan={"Did you recycle?"}
                addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
                />
            //Water Heater Temperature
            case 14:
              return <SingleEntryForm
                card={this.props.card}
                resToClick={this.close}
                completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
                inputs={false}
                slogan={"Did you decrease the temperature on your water heater?"}
                addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
                />
            default:
              return "Something went wrong"
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
  addMonitorsToUser: (monitors, points, userId) => {dispatch(addMonitorsToUser(monitors, points, userId))},
  addDegreesDecreasedToUser: (degrees, points, userId) => {dispatch(addDegreesDecreasedToUser(degrees, points, userId))},
  addDegreesIncreasedToUser: (degrees, points, userId) => {dispatch(addDegreesIncreasedToUser(degrees, points, userId))}
})

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoModal)
