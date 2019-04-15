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
          render={() => <Content location={location} component={<Search isAuthenticated={isAuthenticated} />} group="find" />} // TODO: Change to Main and all associated changes
        />
        <Route
          path="/find/map-view"
          render={() => <Content location={location} component={<MapView isAuthenticated={isAuthenticated} />} group="find" />}
        />
        <Route
          path="/find/list-view"
          render={() => <Content location={location} component={<ListView isAuthenticated={isAuthenticated} />} group="find" />}
        />
        <Route
          path="/find/listing/:id"
          render={() => <Content location={location} component={<Listing isAuthenticated={isAuthenticated} />} group="find" />}
        />
        <Route
          path="/track/overview"
          render={() => <Content location={location} component={<Overview isAuthenticated={isAuthenticated} />} group="track" />}
        />
        <Route
          path="/track/follow-ups"
          render={() => <Content location={location} component={<FollowUps isAuthenticated={isAuthenticated} />} group="track" />}
        />
        <Route
          path="/track/interviews"
          render={() => <Content location={location} component={<Interviews isAuthenticated={isAuthenticated} />} group="track" />}
        />
        <Route
          path="/analyze/applications"
          render={() => <Content location={location} component={<Applications isAuthenticated={isAuthenticated} />} group="analyze" />}
        />
        <Route
          path="/analyze/correspondence"
          render={() => <Content location={location} component={<Correspondence isAuthenticated={isAuthenticated} />} group="analyze" />}
        />
        <Route
          path="/"
          exact
          render={() => <Content location={location} component={<Home isAuthenticated={isAuthenticated} />} group="" />}
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
