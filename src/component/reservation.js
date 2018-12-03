import React from 'react'
import { SingleDatePicker } from 'react-dates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bookMenu, toggleModal } from '../action/indexAction';
import { withRouter } from "react-router";
import moment from 'moment';

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: moment(new Date()),
            sendReservation: true,
            dateSelected: {},
            totalPrice: 0,
            guest: 0,
            dateInfo: 'Choisissez une date disponible',
            guestInfo: ''
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
    updatePrice = (e) => {
        const guest = e.target.value;
        this.setState({
            totalPrice: this.props.price * guest,
            guest,
            guestInfo: ''
        });
    }
    handleDateChange = (date) => {
        this.setState({
            selected: date
        });
        const avaibleDates = this.props.available.map(d => moment(new Date(d.date)));
        const verifyDate = avaibleDates.filter(day => date.isSame(day, 'day'))
        if (verifyDate.length > 0) {
            this.handleReservation(verifyDate[0]);
            this.setState({
                dateInfo: ''
            })
        } else {
            this.setState({
                sendReservation: true,
                dateSelected: {},
                dateInfo: 'Choisissez une date disponible'
            })
        }
    }

    bookingMenu = () => {
        const { user, menu } = this.props;
        const { guest } = this.state;
        const loader = document.querySelector('.loader-spinner');
        if (guest > 0) {
            if (user.token) {
                this.props.available.forEach((d) => {
                    if (moment(new Date(d.date)).isSame(this.state.selected)) {
                        this.props.bookMenu(user.token, d.id, menu.id, guest, this.props.history);
                        loader.setAttribute('style', 'display : block');
                    }
                });
            } else {
                this.props.toggleModal()
            }
        } else {
            this.setState({
                guestInfo: 'Choisissez un nombre de convive'
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
                    <p className="info">{this.state.dateInfo}</p>
                    <div className="guest">
                        <p>Nombre de convives</p>
                        <select id="monselect" onChange={this.updatePrice}>
                            <option value="0" selected>Choisissez</option>
                            <option value="2">2 personne</option>
                            <option value="4">4 personnes</option>
                            <option value="6">6 personnes</option>
                            <option value="8">8 personnes</option>
                            <option value="10">10 personnes</option>
                            <option value="12">12 personnes</option>
                        </select>
                    </div>
                    <p className="info">{this.state.guestInfo}</p>
                    <div className="price">
                        <p>Prix unitaire</p>
                        <p><strong>{this.props.price}€</strong></p>
                    </div>
                    <div className="total-price">
                        <p>Total</p>
                        <p><strong>{this.state.totalPrice}€</strong></p>
                    </div>

                    <p className="text-center">
                        <button className="btn-zot" onClick={() => this.bookingMenu()} >
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
        user: state.user,
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        bookMenu,
        toggleModal
    }, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reservation));