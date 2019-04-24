import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import Home from './components/Routes/Home/Home';
import Search from './components/Routes/Find/Search/Search';
import Results from './components/Routes/Find/Results/Results';
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
    const { isAuthenticated } = this.props;

    let routes = (
      <Switch>
        <Route
          path="/find/search"
          render={() => <Search isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/find/results"
          render={() => <Results isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/find/listing/:id"
          render={() => <Listing isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/track/overview"
          render={() => <Overview isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/track/follow-ups"
          render={() => <FollowUps isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/track/interviews"
          render={() => <Interviews isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/analyze/applications"
          render={() => <Applications isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/analyze/correspondence"
          render={() => <Correspondence isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/"
          exact
          render={() => <Home isAuthenticated={isAuthenticated} />}
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
