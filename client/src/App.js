import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Willdo from './contracts/Willdo.json';
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { choreCount: 0, web3: null, accounts: null, contract: null };

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

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({web3, accounts, contract: instance });
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
  }

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h2>Willdo - You'll do it if there's money on the line</h2>
      </div>
    );
  }
}

export default App;
