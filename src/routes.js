import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ListSpace from './schenes/List-Space';
import DetailSpace from './schenes/Detail-Space';

class Routes extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/space" component={ListSpace} />
          <Route path="/space-detail/:id" component={DetailSpace} />
        </Switch>
    );
  }
}

export default Routes;
