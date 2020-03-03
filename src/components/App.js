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
      // console.log(contract);
      this.setState({contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })

      // Charger les Couleurs
      for (var i=1; i<= totalSupply; i++) {
        const color = await contract.methods.colors(i-1).call()
        this.setState({
          colors: [...this.state.colors, color]
        })
      }
      // See if colors are get well
      // console.log(this.state.colors)
    } else {
      // S'affiche malheureusement dans tous les cas. *** A REVOIR ***
      // window.alert("Le Smart Contract associé n'a pas été déployé sur le réseau détecté")
    }
  }

  mint = (color) => {
    // console.log(color)

    // send() and not call() because we're writing to the Blockchain
    this.state.contract.methods.mint(color).send({from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({
        colors: [...this.state.colors, color]
      })
    })
  }

  constructor(props) {
    super(props);
    this.state = { 
      account: '',
      contract: null,
      totalSupply: 0,
      colors: []
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
                 <h1>Issue Token</h1>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const color = this.color.value
                    this.mint(color)
                  }}>
                    <input
                      type="text"
                      className="form-control mb-1"
                      placeholder="e.g. #000000"
                      ref={(input) => { this.color = input }}
                    />
                    <input
                      type="submit"
                      className="btn btn-block btn-primary"
                      value="MiNT"
                    />
              </form> 
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
                  {/* Edit <code>src/components/App.js</code> and save to reload. */}
                  
                  The  <code>BLOCKCHAIN</code> symbolizes a shift in POWER  
                  <code> from the CENTER to the EDGES</code>.
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
              

          </div>
          <hr />
          <div className="row text-center">
            { this.state.colors.map((color, key) => {
              return(<div key={key} className="col-md-3 mb-3">
                <div className="token" style={{ backgroundColor: color}}></div>
                <div>{color}</div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
