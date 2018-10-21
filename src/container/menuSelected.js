import React from 'react'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

class MenuSelected extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="container" id="menu-selected">
                <h1 className="text-center">Reservez un menu</h1>
                <div className="row">

                    <div className="col-lg-8">
                        <div className="menu">
                            <div className="detail">

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="reservation">
                            <InfiniteCalendar
                                width={400}
                                height={400}
                                locale={{
                                    locale: require('date-fns/locale/fr'),
                                    headerFormat: 'dddd, D MMM',
                                    weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
                                    blank: 'Aucune date selectionnee',
                                    todayLabel: {
                                        long: 'Aujourd\'hui',
                                        short: 'Auj.'
                                    }
                                }}
                                theme={{
                                    selectionColor: '#FE2B00',
                                    textColor: {
                                        default: '#333',
                                        active: '#FFF'
                                    },
                                    weekdayColor: '#FE2B00',
                                    headerColor: ' rgba(254, 38, 0, 0.66)',
                                    floatingNav: {
                                        background: ' rgba(254, 123, 0, 0.56)',
                                        color: '#FFF',
                                        chevron: '#FFA726'
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MenuSelected;