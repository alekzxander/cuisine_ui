import React from 'react'
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { dateBooking } from '../action/indexAction';

import moment from 'moment';
class CookerCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            dates: [],
            focused: ''
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
            const dates = cooker.dates.map((book) => {
                return moment(new Date(book.date))
            });
            this.setState({
                dates
            });
        }
    }
    handleDateChange = (date) => {
        const isPresent = this.state.dates.find(d => date.isSame(d))
        this.setState({
            dates: this.state.dates
                .filter(d => isPresent ? !date.isSame(d) : true)
                .concat(isPresent ? [] : [date])
                .sort((d1, d2) => d1.isBefore(d2) ? -1 : 1)
        })
    }
    render() {
        console.log(this.props.cooker)
        const dateTest = new Date('2018-11-13T12:00:00+04:00');
        const selectDate = moment(dateTest)
        return (<div className="calendar-cooker">

            <SingleDatePicker
                onDateChange={this.handleDateChange}
                focused={this.state.calendarFocused}
                onFocusChange={e => this.setState({ calendarFocused: !this.state.calendarFocused })}
                keepOpenOnDateSelect={true}
                isDayHighlighted={d1 => this.state.dates.some(d2 => d1.isSame(d2, 'day'))}
            />

            <p className="text-center">
                <button className="btn-zot" onClick={() => this.registerDate()}>
                    Reserver ces dates
                                    </button>
            </p>
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