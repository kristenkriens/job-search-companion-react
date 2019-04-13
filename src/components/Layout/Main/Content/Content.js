import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Content.scss';
import * as actions from '../../../../store/actions/index';

class Content extends Component {
  componentDidMount() {
    this.props.handleNavGroupItemLoaded(this.props.group);
  }

  render() {
    const { component } = this.props;

    let dashedComponent = component.type.name.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();

    return (
      <div className="content">
        <div className={`content-inner content-inner--${dashedComponent}`}>
          {component}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleNavGroupItemLoaded: (navGroup) => dispatch(actions.changeOpenSidenavGroup(navGroup))
  }
}

export default connect(null, mapDispatchToProps)(Content);
