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
import { faAngleDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import 'react-dates/lib/css/_datepicker.css';

library.add(faAngleDown, faPlusCircle)

class App extends Component {

  render() {

    return (
      <div>
        < Header />
        <Switch >
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