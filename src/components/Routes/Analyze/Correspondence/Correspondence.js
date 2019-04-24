import React, { Component } from 'react';

import Button from '../../../UI/Button/Button';

class Correspondence extends Component {
  render() {
    return (
      <>
        <h1 className="accessible">Analyze Correspondence</h1>
        <form className="form">
          <div className="form__element">
            <label htmlFor="correspondence">Please enter the text you would like to analyze below:</label>
            <textarea id="correspondence"></textarea>
          </div>
          <div className="form__footer">
            <Button type="submit">Analyze</Button>
          </div>
        </form>
      </>
    )
  }
}

export default Correspondence;
