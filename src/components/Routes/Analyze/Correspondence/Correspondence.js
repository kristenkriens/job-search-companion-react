import React, { Component } from 'react';

import Button from '../../../UI/Button/Button';

class Correspondence extends Component {
  render() {
    return (
      <>
        <form className="form">
          <div className="form__element">
            <label htmlFor="correspondence">Please enter the text you would like to analyze below:</label>
            <textarea id="correspondence"></textarea>
          </div>
          <div class="form__footer">
            <Button type="submit">Analyze</Button>
          </div>
        </form>
      </>
    )
  }
}

export default Correspondence;
