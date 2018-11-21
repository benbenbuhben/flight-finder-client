import React, {Fragment} from 'react';
import {Button, Form, FormGroup, ControlLabel} from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';
import superagent from 'superagent';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      multiple: false,
      options: [],
      selected: [],
      origin: '',
      destination: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleOriginChange = this.handleOriginChange.bind(this)
    this.handleDestinationChange = this.handleDestinationChange.bind(this)
  }

  // componentWillReceiveProps(){
  //   let options = this.props.options;
  //   this.setState({options});
  // }

  async componentWillMount() {
    await superagent.get(`http://localhost:5000/api/airports/all`)
      .then(results => {
        let options = results.body;
        this.setState({options});  
      })
  }

  handleSubmit(event){
    event.preventDefault()
    let originCode = this.state.origin[0].code;
    let destinationCode = this.state.destination[0].code;
    this.props.flightSearch(originCode, destinationCode);
  }

  handleOriginChange(event){
    event.preventDefault()
    let origin = event.target.searchFormOrigin.value.trim();
    this.setState({origin})
  }

  handleDestinationChange(event){
    event.preventDefault()
    let destination = event.target.searchFormDestination.value.trim();
    this.setState({destination})
  }

  handleFocus(event) {
    event.target.select();
  }

  render() {
    const {multiple} = this.state;
    let isInvalid;
    let isValid;
    let validationState;

    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} inline>
          <FormGroup validationState={validationState} bsSize="large">
              <ControlLabel>From</ControlLabel>
              <Typeahead
                id="searchFormOrigin"
                isInvalid={isInvalid}
                bsClass="searchForm"
                isValid={isValid}
                onChange={(origin) => this.setState({origin})}
                onFocus={this.handleFocus}
                labelKey="name"
                multiple={multiple}
                options={this.state.options}
                placeholder="Select a departure airport..."
                width="100px"
                // selected={this.state.origin}
              />
          </FormGroup>{' '}
          <FormGroup validationState={validationState} bsSize="large">
              <ControlLabel>To</ControlLabel>
              <Typeahead
                id="searchFormDestination"
                bsClass="searchForm"
                isInvalid={isInvalid}
                isValid={isValid}
                onChange={(destination) => this.setState({destination})}
                onFocus={this.handleFocus}
                labelKey="name"
                multiple={multiple}
                options={this.state.options}
                placeholder="Select a destination airport..."
                width="100px"
                // selected={this.state.destination}
              />
          </FormGroup>{' '}
          <div id="searchBtn">
            <Button
              className="btn-outline-primary"
              bsStyle="primary"
              type="submit">
              Find Flights
            </Button>
          </div>
        </Form>
      </Fragment>


 
    );
  }
}