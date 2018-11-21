import React from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Panel} from 'react-bootstrap';

export default class SearchResultList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
    };

    this.handleChange =this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    let selected = event.target.value;
    this.props.sortFlights(selected);
  }
 
  render() {
    let sortTab;
    if (this.props.searchResults.length){
      sortTab = 
      <Form inline>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Sort by</ControlLabel>{' '}
          <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
            <option value="departs">Departure</option>
            <option value="arrives">Arrival</option>
            <option value="mainCabinPrice">Price</option>
          </FormControl>
        </FormGroup>
      </Form>
    }

    return (
      <React.Fragment>
        {sortTab}
        {
          this.props.searchResults.map( (flight, i) => 
            
            <li key={i}>
                <Panel bsStyle="info">
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">{flight.from} to {flight.to}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>{new Date(flight.departs).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(flight.arrives).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Panel.Body>
                </Panel>
                {/* <h2>{flight.from} to {flight.to}</h2>
                <p>Flight #{flight.flightNumber}</p>
                <p>Departs {flight.departs}</p>
                <p>Arrives {flight.arrives}</p>
                <p>Main Cabin: ${flight.mainCabinPrice}</p>
                <p>First Class: ${flight.firstClassPrice}</p> */}
            </li>
          )
        }
      </React.Fragment>
    );
  }
}