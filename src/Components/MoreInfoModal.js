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
          slogan={<React.Fragment>Replacing light bulbs is an easy, inexpensive way to save $4/year/bulb! <br/><a className='completeAction'>To complete this action,</a> replace bulbs in your home with LED bulbs. <br/><br/> How many bulbs did you replace?</React.Fragment>}
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
          slogan={<React.Fragment>Replacing old windows with energy efficient counterparts could save you $350 annually on utility bills!<br/><a className='completeAction'>To complete this action,</a> replace old windows with energy efficient windows. <br/><br/>How many windows did you replace? </React.Fragment>}
          addItemsToUser={(windows, points, userId) => this.props.addWindowsToUser(windows, points, userId)}
          />
        // Refrigerator
      case 3:
        return <SingleEntryForm
          card={this.props.card}
          resToClick={this.close}
          completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
          inputs={false}
          slogan={<React.Fragment>You could save $270 over the next five years by flipping your fridge from an energy guzzler to an energy saver! Use <a href="https://www.energystar.gov/index.cfm?fuseaction=refrig.calculator">this calculator</a> to determine how much you can save.<br/><a className='completeAction'>To complete this action,</a> replace your fridge <br/><br/>Did you upgrade your refrigerator? </React.Fragment>}
          addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
          />
        // Drive Less
      case 4:
        return <SingleEntryForm
          card={this.props.card}
          resToClick={this.close}
          inputs={true}
          completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
          slogan={<React.Fragment><a className='completeAction'>To complete this action,</a> commit to driving fewer miles this week.<br/><br/>Note that the below savings represent the amount of money you would save if you maintained this habbit for the entire year. How many fewer miles did you drive this week?</React.Fragment>}
          addItemsToUser={(miles, points, userId) => this.props.addMilesToUser(miles, points, userId)}
          />
        // Monitors
        case 5:
          return <SingleEntryForm
            card={this.props.card}
            resToClick={this.close}
            completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
            inputs={true}
            slogan={<React.Fragment><a className='completeAction'>To complete this action,</a> take two seconds out of your day and enable sleep mode on your computer and/or monitor and save $14 this year.</React.Fragment>}
            addItemsToUser={(monitors, points, userId) => this.props.addMonitorsToUser(monitors, points, userId)}
            />
          //Trash
        case 6:
          return <SingleEntryForm
            card={this.props.card}
            resToClick={this.close}
            completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
            inputs={false}
            slogan={<React.Fragment><a className='completeAction'>To complete this action,</a> commit to not producing trash for three days.</React.Fragment>}
            addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
            />
          // Winter Heat
        case 7:
          return <SingleEntryForm
            card={this.props.card}
            resToClick={this.close}
            completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
            slogan={<React.Fragment><a className='completeAction'>To complete this action,</a> commit to turning down your thermostat this week.<br/><br/>Note that the below savings represent the amount of money you would save if you maintained this habbit for the entire year. By how many degrees did you decrease your heat?</React.Fragment>}
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
            slogan={<React.Fragment><a className='completeAction'>To complete this action,</a> reduce your carbon footprint by purchasing clean energy from your utility or a third-party distributor.<br/></React.Fragment>}
            addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
            />
          // Cold Water Wash
        case 9:
          return <SingleEntryForm
            card={this.props.card}
            resToClick={this.close}
            completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
            inputs={false}
            slogan={<React.Fragment><a className='completeAction'>To complete this action,</a> wash clothes in cold water this week to conserve energy and preserve colors.<br/><br/>Note that the below savings represent the amount of money you would save if you maintained this habbit for the entire year.</React.Fragment>}
            addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
            />
          // Programmable Thermostat
        case 10:
          return <SingleEntryForm
            card={this.props.card}
            resToClick={this.close}
            inputs={false}
            completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
            slogan={<React.Fragment><a className='completeAction'>To complete this action,</a> automate your energy savings and save big on utility bills by purchasing a programmable thermostat.</React.Fragment>}
            addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
            />
          // Air Leaks
          case 11:
            return <SingleEntryForm
              card={this.props.card}
              resToClick={this.close}
              completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
              inputs={false}
              slogan={<React.Fragment>Insulating your home can save you 20% on utility bills!<br/><br/><a className='completeAction'>To complete this action,</a> ensure that your home is properly insulated.</React.Fragment>}
              addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
              />
            //Summer AC
            case 12:
              return <SingleEntryForm
                card={this.props.card}
                resToClick={this.close}
                completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
                slogan={<React.Fragment><a className='completeAction'>To complete this action,</a> commit to turning down your thermostat this week.<br/><br/>Note that the below savings represent the amount of money you would save if you maintained this habbit for the entire year. By how many degrees did you decrease your heat?</React.Fragment>}
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
                slogan={<React.Fragment><a className='completeAction'>To complete this action,</a> recycle all recyclables, including batteries, magazines, and light bulbs, for one week.</React.Fragment>}
                addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
                />
            //Water Heater Temperature
            case 14:
              return <SingleEntryForm
                card={this.props.card}
                resToClick={this.close}
                completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
                inputs={false}
                slogan={<React.Fragment><br/><a className='completeAction'>To complete this action,</a> save an easy $42/year by simply adjusting your water heater to the recommended temperature: 120 degrees.</React.Fragment>}
                addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
                />
              //Solar
              case 15:
                return <SingleEntryForm
                  card={this.props.card}
                  resToClick={this.close}
                  completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
                  inputs={false}
                  slogan={<React.Fragment>Turn your roof into your own personal, renewable power plant by installing solar panels on your roof. Find out how much you can save with solar by visiting this <a href="https://www.solar-estimate.org/solar-panel-calculations/solar-savings-calculator">Solar Estimator.</a></React.Fragment>}
                  addItemsToUser={(points, userId) => this.props.addPointsToUser(points, userId)}
                  />
                //Peak
                case 16:
                  return <SingleEntryForm
                    card={this.props.card}
                    resToClick={this.close}
                    completeCard={(total_score, total_dollar_savings) => this.completeCard(total_score, total_dollar_savings)}
                    inputs={false}
                    slogan={<React.Fragment><a className='completeAction'>To complete this action,</a> refrain from using heavy appliances such as electric vehicle supply equipment, clothes washers, and pool pumps between 12pm-6pm this week. This low-effort method can help prevent your utility from burning unneeded fossil fuels!</React.Fragment>}
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
