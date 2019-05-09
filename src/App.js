import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import Home from './components/Routes/Home/Home';
import Search from './components/Routes/Find/Search/Search';
import Results from './components/Routes/Find/Results/Results';
import SavedJobs from './components/Routes/Find/SavedJobs/SavedJobs';
import Overview from './components/Routes/Track/Overview/Overview';
import FollowUps from './components/Routes/Track/FollowUps/FollowUps';
import Interviews from './components/Routes/Track/Interviews/Interviews';

import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount = () => {
    const { userIp, userAgent, getUserIp, getUserAgent } = this.props;

    this.props.tryAutoSignup();

    if(!userIp) {
      getUserIp();
    }

    if(!userAgent) {
      getUserAgent();
    }
  }

  render() {
    const { isAuthenticated, userIp, userAgent } = this.props;

    let routes = (
      <Switch>
        <Route
          path="/find/search"
          render={() => <Search isAuthenticated={isAuthenticated} userIp={userIp} userAgent={userAgent} />}
        />
        <Route
          path="/find/results"
          render={() => <Results isAuthenticated={isAuthenticated} userIp={userIp} userAgent={userAgent} />}
        />
        <Route
          path="/find/saved-jobs"
          render={() => <SavedJobs isAuthenticated={isAuthenticated} userIp={userIp} userAgent={userAgent} />}
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
    isAuthenticated: state.auth.token !== null,
    userIp: state.user.userIp,
    userAgent: state.user.userAgent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryAutoSignup: () => dispatch(actions.authCheckState()),
    getUserIp: () => dispatch(actions.getUserIp()),
    getUserAgent: () => dispatch(actions.getUserAgent())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
