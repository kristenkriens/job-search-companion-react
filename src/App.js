import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import SearchForm from './containers/Find/SearchForm/SearchForm';
import MapView from './containers/Find/MapView/MapView';
import ListView from './containers/Find/ListView/ListView';
import Listing from './containers/Find/Listing/Listing';
import Overview from './containers/Track/Overview/Overview';
import FollowUps from './containers/Track/FollowUps/FollowUps';
import Interviews from './containers/Track/Interviews/Interviews';
import Applications from './containers/Analyze/Applications/Applications';
import Correspondence from './containers/Analyze/Correspondence/Correspondence';

import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/map" component={MapView} />
        <Route path="/list" component={ListView} />
        <Route path="/listing/:id" component={Listing} />
        <Route path="/" exact component={SearchForm} />
        <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/map-view" component={MapView} />
          <Route path="/list-view" component={ListView} />
          <Route path="/listing/:id" component={Listing} />
          <Route path="/overview" component={Overview} />
          <Route path="/follow-ups" component={FollowUps} />
          <Route path="/interviews" component={Interviews} />
          <Route path="/applications-chart" component={Applications} />
          <Route path="/correspondence" component={Correspondence} />
          <Route path="/" exact component={SearchForm} />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
