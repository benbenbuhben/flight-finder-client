<a id="top"></a>
# Flight Finder Client

**Author**: Ben Hurst

**Version**: 0.1.0

**Live Site**: http://imaginary-air.s3-website-us-west-2.amazonaws.com/

**Live Server ***(redirects to Swagger API Docs)*****: https://flightfinderapi.azurewebsites.net/

**Back-end GitHub Repo:** https://github.com/benbenbuhben/FlightFinderAPI
___

## Table of contents

* [Overview](#overview)
* [Getting Started](#getting-started)
* [Change Log](#change-log)

___

<a id="overview"></a>
## Overview

Simple web interface to search and sort airline flight information.

**Key Features:**

* React.js components configured to consume [FlightFinderAPI](https://github.com/benbenbuhben/FlightFinderAPI) endpoints. UI form input validation is dynamically loaded with current airports from API call.

* Responsive styling done with Bootstrap Grid Layout via [React Bootstrap](https://react-bootstrap.github.io/)

* Typeahead feature provided by [React Bootstrap Typeahead](http://ericgio.github.io/react-bootstrap-typeahead/).

___

<a id="getting-started"></a>

## Getting Started in Development (using npm)

In a terminal instance:

1. ```git clone https://github.com/benbenbuhben/FlightFinderAPI.git```
2. ```cd flight-finder-client/```
3. ```npm i``` to install required dependencies.
4. ```npm run start```

<a id="change-log"></a> 

## Change Log

11-20-2018 4:00pm - Initial Scaffolding.

11-21-2018 10:24am - API endpoint integration functional.

11-22-2018 5:45pm - Input form validation.

11-24-2018 09:37pm - Responsive styling using React Bootstrap grid.

11-25-2018 2:38pm - Deployed to AWS S3.

[Back to top](#top)
