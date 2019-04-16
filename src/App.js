import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Content from './components/Layout/Main/Content/Content';
import Layout from './components/Layout/Layout';
import Home from './components/Routes/Home/Home';
import Search from './components/Routes/Find/Search/Search';
import MapView from './components/Routes/Find/MapView/MapView';
import ListView from './components/Routes/Find/ListView/ListView';
import Listing from './components/Routes/Find/Listing/Listing';
import Overview from './components/Routes/Track/Overview/Overview';
import FollowUps from './components/Routes/Track/FollowUps/FollowUps';
import Interviews from './components/Routes/Track/Interviews/Interviews';
import Applications from './components/Routes/Analyze/Applications/Applications';
import Correspondence from './components/Routes/Analyze/Correspondence/Correspondence';

import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount = () => {
    this.props.tryAutoSignup();
  }

  render() {
    const { isAuthenticated, location } = this.props;

    let routes = (
      <Switch>
        <Route
          path="/find/search"
          render={() => <Content component={<Search isAuthenticated={isAuthenticated} />} location={location} />}
        />
        <Route
          path="/find/map-view"
          render={() => <Content component={<MapView isAuthenticated={isAuthenticated} />} location={location} />}
        />
        <Route
          path="/find/list-view"
          render={() => <Content component={<ListView isAuthenticated={isAuthenticated} />} location={location} />}
        />
        <Route
          path="/find/listing/:id"
          render={() => <Content component={<Listing isAuthenticated={isAuthenticated} />} location={location} />}
        />
        <Route
          path="/track/overview"
          render={() => <Content component={<Overview isAuthenticated={isAuthenticated} />} location={location} />}
        />
        <Route
          path="/track/follow-ups"
          render={() => <Content component={<FollowUps isAuthenticated={isAuthenticated} />} location={location} />}
        />
        <Route
          path="/track/interviews"
          render={() => <Content component={<Interviews isAuthenticated={isAuthenticated} />} location={location} />}
        />
        <Route
          path="/analyze/applications"
          render={() => <Content component={<Applications isAuthenticated={isAuthenticated} />} location={location} />}
        />
        <Route
          path="/analyze/correspondence"
          render={() => <Content component={<Correspondence isAuthenticated={isAuthenticated} />} location={location} />}
        />
        <Route
          path="/"
          exact
          render={() => <Content component={<Home isAuthenticated={isAuthenticated} />} location={location} />}
        />
        <Redirect to="/" />
      </Switch>
    )

    return (
      <Layout routes={routes} />
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
    tryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
