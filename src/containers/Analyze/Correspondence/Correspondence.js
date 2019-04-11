import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class Correspondence extends Component {
  componentDidMount() {
    this.props.handleNavGroupItemLoaded('analyze');
  }

  render() {
    return (
      <div className="content-inner content-inner--analyze-correspondence">
        <form className="form">
          <div className="form__element">
            <label htmlFor="correspondence">Please enter the text you would like to analyze below:</label>
            <textarea id="correspondence"></textarea>
          </div>
          <button type="submit" className="form__submit">Analyze</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleNavGroupItemLoaded: (navGroup) => dispatch(actions.changeOpenSidenavGroup(navGroup))
  }
}

export default connect(null, mapDispatchToProps)(Correspondence);
