import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import Color from '../abis/Color.json'

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else {
      window.alert("Ce navigateur ne supporte pas Ethereum. Essayez MetaMask!");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Charger les comptes
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkID = await web3.eth.net.getId()
    const networkData = Color.networks[networkID]

    if(networkData) {
      const address = networkData.address;
      const abi = Color.abi;
      const contract = new web3.eth.Contract(abi, address);
      console.log(contract);
    } else {
      // S'affiche malheureusement dans tous les cas. *** A REVOIR ***
      // window.alert("Le Smart Contract associé n'a pas été déployé sur le réseau détecté")
    }
  }

  constructor(props) {
    super(props);
    this.state = { 
      account: ''
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://miakassissa-blockchain.netlify.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Color Tokens | Crypto Collectible - ERC721
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">
                <span id="account">{this.state.account}</span>
              </small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                { /* FORM GOES HERE! */ }
              </div>
              <hr />
              <div className="content mr-auto ml-auto">
                <a
                  href="https://miakassissa-blockchain.netlify.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Tokenized. Decentralized.</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://www.youtube.com/watch?v=vx5dATT0Os0&list=PLPU1VWZcc21BGYzHvq4hRZ6HfihEzlSLR"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN{" "}
                  <u>
                    <b>NOW! </b>
                  </u>
                </a>
              </div>
            </main>
            <div className="content mr-auto ml-auto"></div>
            { /* FORM GOES HERE! */ }

          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default App;
