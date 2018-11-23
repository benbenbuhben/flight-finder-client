import React, {Fragment} from 'react';
import {Button, Form, FormGroup, ControlLabel} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import superagent from 'superagent';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      airports: [],
      selected: [],
      origin: [],
      destination: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  async componentWillMount() {
    await superagent.get(`http://localhost:5000/api/airports/all`)
      .then(results => {
        let airports = results.body;
        this.setState({airports});  
      })
  }

  handleSubmit(event){
    event.preventDefault()
    let originCode = this.state.origin[0].code;
    let destinationCode = this.state.destination[0].code;
    this.props.flightSearch(originCode, destinationCode);
  }

  handleFocus(event) {
    event.target.select();
  }

  render() {
    const {origin, destination} = this.state;
    let validationStateOrigin, validationStateDestination;

    return (
      <Fragment>
        <div id="searchForm">
          <Form onSubmit={this.handleSubmit} inline>
            <FormGroup validationState={validationStateOrigin} bsSize="large">
                <ControlLabel>From</ControlLabel>
                <Typeahead
                  id="searchFormOrigin"
                  bsClass="searchForm"
                  onChange={(origin) => this.setState({origin})}
                  onFocus={this.handleFocus}
                  minLength={1}
                  labelKey="name"
                  multiple={false}  
                  options={this.state.airports}
                  placeholder="Select a departure airport..."
                  width="100px"
                />
            </FormGroup><div id="arrow">  ➤  </div>
            <FormGroup validationState={validationStateDestination} bsSize="large">
                <ControlLabel>To</ControlLabel>
                <Typeahead
                  id="searchFormDestination"
                  bsClass="searchForm"
                  onChange={(destination) => this.setState({destination})}
                  onFocus={this.handleFocus}
                  minLength={1}
                  labelKey="name"
                  multiple={false}  
                  options={this.state.airports}
                  placeholder="Select a destination airport..."
                  width="100px"
                />
            </FormGroup>{' '}
            <div id="searchBtn">
              <Button
                className="btn-outline-primary noSelect"
                bsStyle="primary"
                disabled={(origin[0] === destination[0]) || !(origin.length && destination.length)}
                type="submit">
                Find Flights
              </Button>
            </div>
          </Form>
        </div>
      </Fragment>
    );
  }
}