import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ListSpace from './schenes/List-Space';
import DetailSpace from './schenes/Detail-Space';
import config from './config';


class Routes extends Component {
  render() {
    return (
        <Switch>
          <Route exact path={`${config.mainPath}/list-space`} component={ListSpace} />
          <Route path={`${config.mainPath}/detail-space/:id`} component={DetailSpace} />
          <Redirect to={`${config.mainPath}/list-space`} />
        </Switch>
    );
  }
}

export default Routes;
