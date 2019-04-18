import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './Content.scss';
import * as actions from '../../../../store/actions/index';

class Content extends Component {
  componentDidMount = () => {
    const group = this.props.location.pathname.split('/')[1];
    this.props.handleSidebarNavGroupItemLoaded(group);

    this.props.getSetBreadcrumb(this.props.sidebarNav);
  }

  componentDidUpdate = () => {
    this.props.getSetBreadcrumb(this.props.sidebarNav);
  }

  render() {
    const { component, location } = this.props;

    let dashedComponent = component.type.name.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();

    return (
      <div className="content">
        <TransitionGroup className="transition-group">
          <CSSTransition
            key={location.pathname}
            classNames="content-inner"
            timeout={{
              enter: 1000,
              exit: 0,
            }}
          >
            <div className={`content-inner content-inner--${dashedComponent}`}>
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
    sidebarNav: state.navigation.sidebarNav
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSidebarNavGroupItemLoaded: (sidebarNavGroup) => dispatch(actions.changeOpenSidebarNavGroup(sidebarNavGroup)),
    getSetBreadcrumb: (sidebarNav) => dispatch(actions.getSetBreadcrumb(sidebarNav))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
