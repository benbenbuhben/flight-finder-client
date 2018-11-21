'use strict';

import React from 'react';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <form className={this.props.searchClass} onSubmit={this.props.flightSearch}>
        <div className="form-group">
          <label htmlFor="searchFormOrigin">From</label>
          <input id="searchFormOrigin" type="text" placeholder="e.g., SEA"/>
        </div>
        <div className="form-group">
          <label htmlFor="searchFormDestination">To</label>
          <input id="searchFormDestination" type="text" placeholder="e.g., PHX"/>
          {/* <input id="searchFormLimit" type="number" min="0" max="100"/> */}
        </div>
        <input type="submit"/>
      </form>
    );
  }
}