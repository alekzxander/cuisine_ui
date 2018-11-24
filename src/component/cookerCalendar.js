import React from 'react'
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { dateBooking } from '../action/indexAction';
import moment from 'moment';
import { Table } from 'reactstrap';
import reservation from './reservation'

class CookerCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            dates: [],
            focused: '',
            datesBooking: []
        }

    }
    registerDate = () => {
        const dates = this.state.dates.map((date) => {
            return moment(date).format();
        });
        this.props.dateBooking(dates, this.props.cooker.token);
    }

    componentDidMount = () => {
        const { cooker } = this.props;
        if (cooker) {
            const dates = cooker.dates.filter(book => !book.book).map(book => moment(new Date(book.date)));
            const datesBooking = cooker.dates.filter(book => book.book).map(book => moment(new Date(book.date)));
            this.setState({
                dates,
                datesBooking: datesBooking
            });
        }
    }
    handleDateChange = (date) => {
        const isPresent = this.state.dates.find(d => date.isSame(d));

        const { dates } = this.state;
        this.setState({
            dates: dates
                .filter(d => isPresent ? !date.isSame(d) : true)
                .concat(isPresent ? [] : [date])
                .sort((d1, d2) => {
                    if (d1) {

                        return d1.isBefore(d2) ? -1 : 1
                    }
                    return '';
                })
        });
    }
    render() {
        const reservations = this.props.cooker.dates.filter(date => date.reservations.length > 0).map(reservation => reservation.reservations[0]);
        const ReservationsList = reservations.map((reservation) => {
            return (
                <tr>
                    <th scope="row">{reservation.menu.title}</th>
                    <td>{moment(reservation.date_booking.date).format("DD-MM-YY")}</td>
                    <td>{reservation.nb_guest}</td>
                    <td>{reservation.user.adresse}</td>
                    <td>{reservation.user.phone}</td>
                    <td>{reservation.user.last_name}</td>
                    <td>{reservation.user.first_name}</td>
                    <td>{reservation.menu.price * reservation.nb_guest} €</td>
                </tr>
            )
        })
        return (<div className="calendar-cooker">
            <h4>mon planning</h4>
            <Table>
                <thead>
                    <tr>
                        <th>Menu</th>
                        <th>Date</th>
                        <th>Convives</th>
                        <th>Adresse</th>
                        <th>Telephone</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Gain</th>
                    </tr>
                </thead>
                <tbody>
                    {ReservationsList}
                </tbody>
            </Table>
            <h4>organisé mes dates</h4>
            <div className="calendar">
                <SingleDatePicker
                    onDateChange={this.handleDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={e => this.setState({ calendarFocused: !this.state.calendarFocused })}
                    keepOpenOnDateSelect={true}
                    isDayHighlighted={d1 => this.state.dates.some(d2 => d1.isSame(d2, 'day'))}
                />

                <p className="text-center">
                    <button className="btn-zot" onClick={() => this.registerDate()}>
                        Sauvegarder ces dates
                </button>
                </p>
            </div>


        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        cooker: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        dateBooking
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CookerCalendar);