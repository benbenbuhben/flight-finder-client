import React from 'react';
import ReactDOM from 'react-dom';
import {Form, FormGroup, ControlLabel, FormControl, Panel} from 'react-bootstrap';
import { CSSTransitionGroup } from 'react-transition-group';
import scrollToComponent from 'react-scroll-to-component';
import {v4 as uuid} from 'uuid';


export default class SearchResults extends React.Component {
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

  componentDidUpdate() {
    let resultHeadingScroll = ReactDOM.findDOMNode(this);
    scrollToComponent(resultHeadingScroll, { offset: -98, align: 'top', duration: 900})
  }
 
  render() {
    let resultHeading, sortTab, items;
    
    if (this.props.searchResults.length){

      // arrow = <img src="/assets/arrow.svg" alt="icon"/>

      resultHeading = <h3 id="resultHeading" ref={(section) => { this.resultHeadingScroll = section }}>Showing {this.props.searchResults.length} flights from {this.props.searchResults[0].from} to {this.props.searchResults[0].to}...</h3>

      sortTab = 
      <Form inline>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Sort by</ControlLabel>{' '}
          <FormControl componentClass="select" placeholder="select" defaultValue="---" onChange={this.handleChange}>
            <option disabled value='---'>---</option>
            <option value="departsForward">Departure (Earliest to Latest)</option>
            <option value="departsReverse">Departure (Latest to Earliest)</option>
            <option value="mainCabinPrice">Best Price (Main Cabin)</option>
            <option value="firstClassPrice">Best Price (First Class)</option>
          </FormControl>
        </FormGroup>
      </Form>
    

      items = this.props.searchResults.map( (flight, i) => 
            
            <li className="fade-in" key={uuid()}>
                <Panel bsStyle="info" className="mainFlightCard">
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">
                    {flight.from} to {flight.to}
                    <span className="flightNumber">Flight #{flight.flightNumber}</span>
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                  <div className="schedule flightCard">
                    {new Date(flight.departs).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - <br/>{new Date(flight.arrives).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                  <div className="duration flightCard">
                    <h2>
                    {
                      Math.floor(((new Date(flight.arrives)-new Date(flight.departs)) % 86400000) / 3600000)
                    }h{' '}
                    {
                      Math.floor((((new Date(flight.arrives)-new Date(flight.departs)) % 86400000) / 3600000)/ 60000)
                    }m </h2><h3 className="nonstop">Nonstop</h3>
                  </div>
                  <div className="prices">
                    <Panel bsStyle="primary" className="flightCard" >
                      <Panel.Heading>
                        <Panel.Title componentClass="h4">
                        First Class
                        </Panel.Title>
                      </Panel.Heading>
                      <Panel.Body className="price">${flight.firstClassPrice}</Panel.Body>
                    </Panel>
                    <Panel bsStyle="info" className="flightCard">
                      <Panel.Heading>
                          <Panel.Title componentClass="h4">
                          Main Cabin
                          </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className="price">${flight.mainCabinPrice}</Panel.Body>
                    </Panel>
                  </div>
                  </Panel.Body>
                </Panel>
            </li>
          )
    }               
    return (
      <React.Fragment>
        <ul>
          {/* {arrow} */}
          {resultHeading}
          {sortTab}
          <CSSTransitionGroup
            transitionName="results"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
          {items}
          </CSSTransitionGroup>
        </ul>
      </React.Fragment>
    );
  }
}