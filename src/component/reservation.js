import React from 'react'
import { SingleDatePicker } from 'react-dates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import moment from 'moment';
class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: moment(new Date()),
            sendReservation: true,
            dateSelected: {}
        }
    }
    handleReservation = (date) => {
        const user = this.props;
        if (user) {
            if (user.user.type === 'user') {
                this.setState({
                    sendReservation: false,
                    dateSelected: moment(date).format()
                })
            } else {
                this.setState({
                    sendReservation: true,
                    dateSelected: {}
                })
            }
        }
    }
    handleDateChange = (date) => {
        this.setState({
            selected: date
        });
        const avaibleDates = this.props.available.map(d => moment(new Date(d.date)));
        const verifyDate = avaibleDates.filter(day => date.isSame(day, 'day'))
        if (verifyDate.length > 0) {
            this.handleReservation(verifyDate[0]);
        } else {
            this.setState({
                sendReservation: true,
                dateSelected: {}
            })
        }
    }
    render() {
        let availableDates = [];
        if (this.props.available) {
            availableDates = this.props.available.map(d => moment(new Date(d.date)));
        }
        return (
            <div className="reservation">
                <div className="header"><h5>Votre reservation</h5>   </div>
                <div className="choice-guess">
                    <div className="calendar">
                        <p style={{ paddingTop: '15px' }}>Le</p>
                        <SingleDatePicker
                            onDateChange={this.handleDateChange}
                            focused={this.state.calendarFocused}
                            onFocusChange={e => this.setState({ calendarFocused: !this.state.calendarFocused })}
                            keepOpenOnDateSelect={true}
                            date={this.state.selected}
                            isDayHighlighted={currentDay => availableDates.filter(day => currentDay.isSame(day, "day")).length > 0}
                            customInputIcon={<FontAwesomeIcon icon="calendar-alt" />}
                        />
                    </div>
                    <div className="guest">
                        <p>Nombre de convives</p>
                        <select id="monselect" onChange={this.props.handleGuest}>
                            <option value="2">2 personne</option>
                            <option value="4">4 personnes</option>
                            <option value="6">6 personnes</option>
                            <option value="8">8 personnes</option>
                            <option value="10">10 personnes</option>
                            <option value="12">12 personnes</option>
                        </select>
                    </div>
                    <div className="price">
                        <p>Prix unitaire</p>
                        <p><strong>{this.props.price}€</strong></p>
                    </div>
                    <div className="total-price">
                        <p>Total</p>
                        <p><strong>{this.props.totalPrice}€</strong></p>
                    </div>

                    <p className="text-center">
                        <button className="btn-zot" disabled={this.state.sendReservation} >
                            {this.state.sendReservation ? <FontAwesomeIcon icon="lock" /> : ''}Reserver cette prestation
                    </button>
                    </p>
                </div>
            </div>
        );
    }
}
const verifyState = (state) => {
    if (state.menu && !state.menu.length) {
        return state.menu.cooker.date_bookings;
    } else {
        return [];
    }
}
const mapStateToProps = (state) => {
    return {
        available: verifyState(state),
        user: state.user
    }

}



export default connect(mapStateToProps, null)(Reservation);