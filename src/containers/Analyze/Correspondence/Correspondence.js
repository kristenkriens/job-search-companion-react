import React, { Component } from 'react';

class Correspondence extends Component {
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

export default Correspondence;
