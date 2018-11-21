import React, {Fragment} from 'react';
import superagent from 'superagent';
import SearchForm from './flight-finder/searchform.js';
import SearchResultList from './flight-finder/searchresultlist';
import '../styles/App.css'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      airports: [],
      hasError: false,
    };
    this.getFlights = this.getFlights.bind(this);
    this.sortFlights = this.sortFlights.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }


  getFlights(origin, destination) {
    let url = `http://localhost:5000/api/flights/search?from=${origin}&to=${destination}`;
    superagent.get(url)
      .then(results => {
        this.setState({hasError: false});
        let flights= results.body
        this.setState({flights});
      })
      .catch(err => console.log(err));
  }

  sortFlights(sortBy) { 
    let flights = this.state.flights;
    switch (sortBy) {
      case 'departs':
        flights.sort((a, b) => new Date(a.departs) - new Date(b.departs));
        break;
      case 'arrives':
        flights.sort((a, b) => new Date(a.arrives) - new Date(b.arrives));
        break;
      case 'mainCabinPrice':
        flights.sort((a, b) => a.mainCabinPrice - b.mainCabinPrice);
        break;
      default:
        break;
    }
    this.setState({flights})
  }

  render() {
    return (
      <Fragment>
        <header>
          <h1>Imaginary Airlines</h1>
        </header>
        <main> 
          <h1>Flight Finder</h1>
          <SearchForm searchClass={this.state.hasError ? 'error' : 'success'} flightSearch={this.getFlights} airports={this.state.airports}/>
          <ul>
            <SearchResultList searchResults={this.state.flights} sortFlights={this.sortFlights}/>
          </ul>
        </main>
      </Fragment>
    );
  }
}