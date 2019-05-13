import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import Search from './components/Routes/Find/Search/Search';
import SearchResults from './components/Routes/Find/SearchResults/SearchResults';
import SavedJobs from './components/Routes/Find/SavedJobs/SavedJobs';
import Applications from './components/Routes/Track/Applications/Applications';
import Results from './components/Routes/Track/Results/Results';

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
          path="/"
          exact
          render={() => <Search isAuthenticated={isAuthenticated} userIp={userIp} userAgent={userAgent} />}
        />
        <Route
          path="/find/search-results"
          render={() => <SearchResults isAuthenticated={isAuthenticated} userIp={userIp} userAgent={userAgent} />}
        />
        <Route
          path="/find/saved-jobs"
          render={() => <SavedJobs isAuthenticated={isAuthenticated} userIp={userIp} userAgent={userAgent} />}
        />
        <Route
          path="/track/applications"
          render={() => <Applications isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/track/results"
          render={() => <Results isAuthenticated={isAuthenticated} />}
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
