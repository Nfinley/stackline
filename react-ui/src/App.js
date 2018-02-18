import React, { Component } from 'react';
import logo2 from './logo2.png';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from  'recharts';

import './App.css';
import {
    ButtonToolbar,
    DropdownButton,
    MenuItem,
    Grid,
    Row,
    Col,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    Glyphicon
} from 'react-bootstrap';

class App extends Component {
    state = {
        response: ''
    };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     message: null,
  //     fetching: true
  //   };
  // }

  // componentDidMount() {
  //   fetch('/api/json')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`status ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(json => {
  //       this.setState({
  //         message: json.message,
  //         fetching: false
  //       });
  //     }).catch(e => {
  //       this.setState({
  //         message: `API call failed: ${e}`,
  //         fetching: false
  //       });
  //     })
  // }
    componentDidMount() {
        this.callApi()
            .then(res => {
                console.log(res)
                const {id, image, title, subtitle, brand, reviews, retailer, details, tags, sales} = res[0];
                let dataObj = {
                    id,
                    image,
                    subtitle,
                    brand,
                    reviews,
                    retailer,
                    details,
                    tags,
                    sales,
                    title
                }
                this.setState({ response: dataObj })
            })
            .catch(err => console.log(err));
    }
    callApi = async () => {
        const response = await fetch('/api/json');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    priceFormatter(cell, row) {
        console.log(cell.toString().slice(-2))// String example
        let newCell = cell.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        // let lastDigits = cell.toString().slice(-2);
        let commaSpot = cell.toString().slice(-5);
        let formattedCell = `$`
        return `$${newCell}`;
    }

    render() {
        const {id, image, title, subtitle, brand, reviews, retailer, details, tags, sales} = this.state.response;
        let getTags;

        if(tags){
            getTags = tags.map(tag =>{
                return (
                    <Button bsSize="xs" className="button-margin">
                        {tag}
                    </Button>
                )
            })
        }
    return (
    <div className="App">
        <header className="App-header">
            <img src={logo2} className="App-logo" alt="logo" />
            {/*<h1 className="App-title">Welcome to React</h1>*/}
        </header>
        <Grid>
            <Row className="show-grid main-container">

                {/*Container for side nav*/}
                <Col xs={12} md={4}>

                    <Row className="side-container">
                        <Col xs={12} md={12}>
                            <img src={image} width="200" height="200" alt={brand}/>
                            <h4><strong>{title}</strong></h4>
                            <p>{subtitle}</p>
                            <hr/>
                            {/*TAGS*/}
                            {getTags}
                            <hr/>
                            {/*OVERVIEW*/}
                            <p>
                                <Glyphicon glyph="home" /> Overview
                            </p>
                            {/*SALES*/}
                            <p>
                                <Glyphicon glyph="signal" /> Sales
                            </p>
                        </Col>
                    </Row>
                </Col>


                {/*Container for graph and table*/}
                <Col xs={6} md={8}>
                    {/*FOR GRAPH*/}
                    <Row className="graph-container">
                        <Col xs={12} md={12}>
                            <h4>Retail Sales</h4>
                            <LineChart width={700} height={300} data={sales}
                                       margin={{top: 40, right: 20, left: 30, bottom: 5}}>
                                <XAxis dataKey="weekEnding"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="6 6"/>
                                <Tooltip/>
                                <Legend />
                                <Line type="monotone" dataKey="retailSales" stroke="#18B7E2" activeDot={{r: 8}}/>
                                <Line type="monotone" dataKey="wholesaleSales" stroke="#5B717F" />
                            </LineChart>

                        </Col>
                    </Row>
                    {/*FOR TABLE*/}
                    <Row className="table-container">
                        <Col xs={12} md={12}>
                            <BootstrapTable ref='table' data={ this.state.response.sales } striped hover>
                                <TableHeaderColumn dataField='weekEnding'  isKey={ true } dataSort={ true }>WEEK ENDING</TableHeaderColumn>
                                <TableHeaderColumn dataField='retailSales' dataSort={ true } dataFormat={ this.priceFormatter }>RETAIL SALES</TableHeaderColumn>
                                <TableHeaderColumn dataField='wholesaleSales' dataSort={ true } dataFormat={ this.priceFormatter }>WHOLESALE SALES</TableHeaderColumn>
                                <TableHeaderColumn dataField='unitsSold' dataSort={ true } >UNITS SOLD</TableHeaderColumn>
                                <TableHeaderColumn dataField='retailerMargin' dataSort={ true } dataFormat={ this.priceFormatter }>RETAILER MARGIN</TableHeaderColumn>
                            </BootstrapTable>
                        </Col>
                    </Row>


                </Col>
            </Row>
        </Grid>
        {/*Set all the three different columns here */}
        {/*<p className="App-intro">{this.state.response.image}</p>*/}
    </div>
      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className="App-intro">
      //     {'This is '}
      //     <a href="https://github.com/mars/heroku-cra-node">
      //       {'create-react-app with a custom Node/Express server'}
      //     </a><br/>
      //   </p>
      //   <p className="App-intro">
      //     {this.state.fetching
      //       ? 'Fetching message from API'
      //       : this.state.message}
      //   </p>
      // </div>
    );
  }
}

export default App;
