import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Willdo from './contracts/Willdo.json';
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
    choreCount: 0,
    web3: null,
    accounts: null,
    contract: null,
    choreName: "",
    daysToComplete: 0,
    approver: "",
    chorePrice: 0,
    chores: [],
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log('Accounts (Your Metamask wallet):', accounts);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log('Network ID (from Ganache):', networkId);
      const deployedNetwork = Willdo.networks[networkId];
      console.log('Address is the address of the contract, transactionHash is the is the hash is the transaction that created the contract');
      console.log('Deployed Network:', deployedNetwork);
      const instance = new web3.eth.Contract(
        Willdo.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log('Instance:', instance);

      // Set web3, accounts, and contract to the state
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    console.log('State:', this.state);

    // Get our current choreCount
    const choreCount = await this.state.contract.methods.choreCount();
    choreCount.call((err, response) => {
      if (err != null) {
        alert(`Failed to fetch choreCount.`);
      }
      console.log('Number of chores:', response);
      this.setState({
        choreCount: response
      });
    })

    this.setState({
      choreName: "",
      daysToComplete: 0,
      approver: "",
      chorePrice: 0,
      chores: [],
    })

    for (var i = 0; i < choreCount; i++) {
      const chore = await this.state.web3.methods.chores(i).call()
      this.setState({
        chores: [...this.state.chores, chore],
      })
    }
  }

  // Update chore creation variables' state
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  // Create a chore on form submit
  async createChore(e) {

    // Prevent automatic reload onSubmit
    e.preventDefault();

    // Variables for ease of use
    const content = this.state.choreName;
    const chorePrice = this.state.chorePrice;
    const daysToComplete = this.state.daysToComplete;
    const approver = this.state.approver;
    var account = "";
    await this.state.web3.eth.getAccounts().then((acct) => {
      account = acct[0]
    })

    // Send eth to chore creation contract
    await this.state.web3.eth.sendTransaction({
      from: "0x0b9fb8FA6a82ba7eFDbFFfB0c7ff5350932e5514",
      to: "0x60729F6376884E2739c867Fcd134d37C8b9Df433",
      value: this.state.web3.utils.toWei(chorePrice, "ether")
    }).on('error', () => {
      alert(`ERROR!!!!`)
      // window.location.reload()
    })

    // Create chore in contract
    await this.state.contract.methods.get().createChore().call(content, parseInt(chorePrice), parseInt(daysToComplete), approver)
  }

  render() {
    if (!this.state.web3) {
      return <h1>Loading Web3, accounts, and contract...</h1>;
    }
    return (
      <div className="App">
        <h2>Willdo - You'll do it if there's money on the line</h2>
        <form onSubmit={(e) => this.createChore(e)}>
          <input id="choreName" value={this.state.value} onChange={(e) => this.handleChange(e)} type="text" placeholder="What's the chore?" required /><br />
          <input id="daysToComplete" value={this.state.value} onChange={(e) => this.handleChange(e)} type="number" placeholder="How many days is the deadline?" required /><br />
          <input id="approver" value={this.state.value} onChange={(e) => this.handleChange(e)} type="text" placeholder="Who's holding you accountable?" required /><br />
          <input id="chorePrice" value={this.state.value} onChange={(e) => this.handleChange(e)} type="number" placeholder="How much ETH to attach to this?" required /><br />
          <input type="submit" />
        </form>
        {this.state.chores.map((chore) => {
          return "test"
        })}
        <ul id="choreList">
          <div>
            <label>
              <input type="checkbox" />
              <span>Submit a chore...</span>
              <p id="choreApprover"></p>
              <p id="chorePrice"></p>
              <p id="daysRemaining"></p>
            </label>
          </div>
        </ul>
      </div>
    );
  }
}

export default App;
