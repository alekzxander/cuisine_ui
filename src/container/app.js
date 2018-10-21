import React, { Component } from 'react';
import IndexLog from './indexLog';
import Header from './header';
import Home from './home';
import Footer from '../component/footer';
import Menus from './menus';
import Cooker from './cooker';
import MenuSelected from './menuSelected';
import { Route, Switch } from 'react-router-dom'

import { withRouter } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <div>
        < Header />
        <Switch >
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