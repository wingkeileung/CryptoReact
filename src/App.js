import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
var NumberFormat = require('react-number-format');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cryptos: []
    };
  }
  fetchResults = () => {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,BCH,ADA,NEO,XLM,EOS,MIOTA,ETH,DASH,DOGE,LTC,ZEC,XRP,XMR&tsyms=BTC,USD,CDN')
    .then(res => {
      const cryptos = res.data;
      this.setState({cryptos: cryptos});
    })
  };

  componentDidMount() {
    this.fetchResults()
    setInterval(this.fetchResults, 30000)
  }

  render() {
    return (
      <div className="App">
        <h3>Live Crypto Currency price in USD</h3>
        {Object.keys(this.state.cryptos).map((key, i) => (
          <div id="crypto-container" key={i}>
            <span className="left">{key} </span>
            <span className="right"><NumberFormat value={this.state.cryptos[key].USD} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={'$'} /> USD</span>
         </div>
       ))}
       <span className="right"><small>API Service provided by CryptoCompare, live auto refresh every 30 seconds</small></span><br/>
       <span className="right"><small>Built by ReactJS</small></span>
      </div>
    );
  }
}

export default App;
