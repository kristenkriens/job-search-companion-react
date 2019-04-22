import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './Content.scss';
import * as actions from '../../../../store/actions/index';

class Content extends Component {
  componentDidMount = () => {
    const group = this.props.pathname.split('/')[1];
    this.props.handleSidebarNavGroupItemLoaded(group);

    this.props.getSetBreadcrumb(this.props.sidebarNav);
  }

  componentDidUpdate = () => {
    this.props.getSetBreadcrumb(this.props.sidebarNav);
  }

  render() {
    const { component, pathname } = this.props;

    return (
      <div className="content">
        <TransitionGroup>
          <CSSTransition
            key={pathname}
            classNames="content-inner"
            timeout={{
              enter: 1000,
              exit: 0
            }}
          >
            <div className="content-inner">
              {component}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sidebarNav: state.navigation.sidebarNav,
    pathname: state.router.location.pathname
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSidebarNavGroupItemLoaded: (sidebarNavGroup) => dispatch(actions.changeOpenSidebarNavGroup(sidebarNavGroup)),
    getSetBreadcrumb: (sidebarNav) => dispatch(actions.getSetBreadcrumb(sidebarNav))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
