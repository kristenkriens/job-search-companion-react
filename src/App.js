import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Content from './containers/Layout/Content/Content';
import Layout from './containers/Layout/Layout';
import Home from './containers/Home/Home';
import Search from './containers/Find/Search/Search';
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
    const { isAuthenticated } = this.props;

    let routes = (
      <Switch>
        <Route
          path="/find/search"
          render={() => <Content component={<Search />} group="find" />}
        />
        <Route
          path="/find/map-view"
          render={() => <Content component={<MapView />} group="find" />}
        />
        <Route
          path="/find/list-view"
          render={() => <Content component={<ListView />} group="find" />}
        />
        <Route
          path="/find/listing/:id"
          render={() => <Content component={<Listing />} group="find" />}
        />
        <Route
          path="/track/overview"
          render={() => <Content component={<Overview />} group="track" />}
        />
        <Route
          path="/track/follow-ups"
          render={() => <Content component={<FollowUps />} group="track" />}
        />
        <Route
          path="/track/interviews"
          render={() => <Content component={<Interviews />} group="track" />}
        />
        <Route
          path="/analyze/applications"
          render={() => <Content component={<Applications />} group="analyze" />}
        />
        <Route
          path="/analyze/correspondence"
          render={() => <Content component={<Correspondence />} group="analyze" />}
        />
        <Route
          path="/"
          exact
          render={() => <Content component={<Home />} group="" />}
        />
        <Redirect to="/" />
      </Switch>
    )

    return (
      <Layout isAuthenticated={isAuthenticated}>
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
