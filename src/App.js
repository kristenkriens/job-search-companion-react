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
    this.props.onTryAutoSignup();
  }

  render() {
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
      <Layout routes={routes} />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
