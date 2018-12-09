import React, { Component } from 'react';
import IndexLog from './indexLog';
import Header from './header';
import Home from './home';
import Footer from '../component/footer';
import Menus from './menus';
import Cooker from './cooker';
import MenuSelected from './menuSelected';
import { Route, Switch } from 'react-router-dom'
import ProfilUser from './profilUser';
import { withRouter } from 'react-router-dom';
import ProfilCooker from './profilCooker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faPlusCircle, faCalendarAlt, faLock } from '@fortawesome/free-solid-svg-icons'
import 'react-dates/lib/css/_datepicker.css';
import { Snackbar } from 'react-redux-snackbar';
library.add(faAngleDown, faPlusCircle, faCalendarAlt, faLock)

class App extends Component {

  render() {
    return (
      <div>
        <div className="loader-spinner">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        < Header />
        <Snackbar />
        <Switch >
          {/* <Route path="/payment" component={() => window.location = 'https://api.sandbox.paypal.com/v1/payments/payment/PAY-7SS52084V3992533PLP6PZ3Y'} /> */}
          <Route path="/profil-cooker/:id" component={ProfilCooker} />
          <Route path="/profil-user" component={ProfilUser} />
          <Route path="/menu/:id" component={MenuSelected} />
          <Route path="/cooker/:id" component={Cooker} />
          <Route path="/connexion" component={IndexLog} />
          <Route path="/menus" component={Menus} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </div>
    )
  }
}


export default withRouter(App);