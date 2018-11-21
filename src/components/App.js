import React from 'react';
import superagent from 'superagent';

import SearchForm from './flight-finder/searchform.js';
import SearchResultList from './flight-finder/searchresultlist';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      hasError: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    let origin = e.target.searchFormOrigin.value.trim();
    let destination = e.target.searchFormDestination.value.trim();
    let url = `http://localhost:5000/api/search?from=${origin}&to=${destination}`;

    superagent.get(url)
      .then(results => {
        console.log(results);
        this.setState({hasError: false});
        let flights= results.body
        this.setState(Object.assign(...this.state, {flights}));
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <main>
        
        <h1>Flight Finder</h1>
        <SearchForm searchClass={this.state.hasError ? 'error' : 'success'} flightSearch={this.handleSubmit} />
        <ul>
          <SearchResultList searchResults={this.state.flights}/>
        </ul>
      </main>
    );
  }
}