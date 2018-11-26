import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Button, FormGroup, ControlLabel, FormControl, Panel} from 'react-bootstrap';
import { CSSTransitionGroup } from 'react-transition-group';
import scrollToComponent from 'react-scroll-to-component';
import {v4 as uuid} from 'uuid';
import ScrollUpButton from 'react-scroll-up-button';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    let selected = event.target.value;
    this.props.sortFlights(selected);
  }

  handleClick(event) {
    event.preventDefault();
    alert('Feature coming soon!');
  }

  componentDidUpdate() {
    let resultHeadingScroll = ReactDOM.findDOMNode(this); // eslint-disable-line
    scrollToComponent(resultHeadingScroll, { offset: -98, align: 'top', duration: 900});
  }
 
  render() {
    let resultHeading, sortTab, items, arrow, listStyle;

    const scrollButtonStyle = {
      display: 'block',
      position: 'relative',
      right: '0',
      bottom: '0',
      width: '50px',
      margin: 'auto',
      transition: 'opacity 0.5s ease-in-out 0s',
      opacity: '0.4',
      fill: '#f4f6f9;',
      backgroundColor: 'transparent',
      zIndex: '1',  
    };
    
    if (this.props.searchResults.length){

      listStyle = {
        height: 'calc(100vh - 100px)',
        overflow: 'scroll',
      };

      arrow = <ScrollUpButton style={scrollButtonStyle} ToggledStyle={{right: 0, opacity: 0.5}} ContainerClassName="scroll-up-button"/>;
      
      resultHeading = <h3 id="resultHeading" ref={section => this.resultHeadingScroll = section}>Showing {this.props.searchResults.length} flights from {this.props.searchResults[0].from} to {this.props.searchResults[0].to}...</h3>;

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
      </Form>;
    
      items = this.props.searchResults.map( flight => 
            
        <li className="fade-in container-fluid" key={uuid()}>
          <Panel bsStyle="info" className="mainFlightCard">
            <Panel.Heading>
              <Panel.Title componentClass="h3">
                {flight.from} to {flight.to}
                <span className="flightNumber">Flight #{flight.flightNumber}</span>
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body className="row">

              <div className="schedule flightCard col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6">
                {new Date(flight.departs).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - <br/>{new Date(flight.arrives).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>

              <div className="duration flightCard col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6">
                <h2>
                  {
                    Math.floor(((new Date(flight.arrives) - new Date(flight.departs)) % 86400000) / 3600000)
                  }h{' '}
                  {
                    Math.floor((((new Date(flight.arrives) - new Date(flight.departs)) % 86400000) / 3600000) / 60000)
                  }m </h2><h3 className="nonstop">Nonstop</h3>
              </div>

              <div className="prices col-xl-3 col-lg-3 col-md-3 col-sm-8 col-xs-8 container">
                <div className="row">
                  <div className="price-container col-xl-6 col-lg-6 col-sm-6 col-xs-6">
                    <Panel bsStyle="info" className="flightCard">
                      <Panel.Heading>
                        <Panel.Title componentClass="h4">
                        Main Cabin
                        </Panel.Title>
                      </Panel.Heading>
                      <Panel.Body className="price">${flight.mainCabinPrice}</Panel.Body>
                    </Panel>
                  </div>
                  <div className="price-container col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <Panel bsStyle="primary" className="flightCard" >
                      <Panel.Heading>
                        <Panel.Title componentClass="h4">
                        First Class
                        </Panel.Title>
                      </Panel.Heading>
                      <Panel.Body className="price">${flight.firstClassPrice}</Panel.Body>
                    </Panel>
                  </div>
                </div>
              </div>

              <div className="btn-wrapper col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <Button
                  className="btn-outline-primary noSelect align-middle"
                  bsStyle="success"
                  type="submit"
                  onClick={this.handleClick}
                >
                Book Now
                </Button>
              </div>

            </Panel.Body>
          </Panel>
        </li>
      );   
    }   

    return (
      <React.Fragment>
        <ul style={listStyle}>
          {arrow}
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