import React, {Fragment} from 'react';
import SearchForm from './flight-finder/SearchForm.js';
import SearchResults from './flight-finder/SearchResults';
import superagent from 'superagent';
import '../styles/App.css';
import '../styles/flight-finder/SearchForm.css';
import '../styles/flight-finder/SearchResults.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      hasError: false,
    };
    this.getFlights = this.getFlights.bind(this);
    this.sortFlights = this.sortFlights.bind(this);
  }

  getFlights(origin, destination) {
    let baseURL = window.location.hostname === 'localhost'? 'http://localhost:5000': 'https://flightfinderapi.azurewebsites.net';
    let url = `${baseURL}/api/flights/search?from=${origin}&to=${destination}`;

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
      case 'departsForward':
        flights.sort((a, b) => new Date(a.departs) - new Date(b.departs));
        break;
      case 'departsReverse':
        flights.sort((a, b) => new Date(b.departs) - new Date(a.departs));
        break;
      case 'mainCabinPrice':
        flights.sort((a, b) => a.mainCabinPrice - b.mainCabinPrice);
        break;
      case 'firstClassPrice':
        flights.sort((a, b) => a.firstClassPrice - b.firstClassPrice);
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
          <section id="page1">
            <h1 className="pageTitle">flight<span className="finder">finder</span></h1>
            <SearchForm searchClass={this.state.hasError ? 'error' : 'success'} flightSearch=   {this.getFlights} airports={this.state.airports}/>
          </section>
          <section id="page2" className={this.state.flights.length? this.state.flights[0].to:null}>
            <SearchResults searchResults={this.state.flights} sortFlights={this.sortFlights}/>
          </section>
        </main>
      </Fragment>
    );
  }
}