import React, { Component } from 'react';
import Willdo from './contracts/Willdo.json';
import getWeb3 from './getWeb3';
import ChoreList from './components/ChoreList';
// import { Form, Input, Button, InputNumber } from 'antd';


import "./App.css";

class App extends Component {
  state = {
    choreCount: 0,
    web3: null,
    accounts: null,
    contract: null,
    choreName: "",
    daysToComplete: 0,
    chorePrice: 0,
    chores: [],
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Willdo.networks[networkId];
      const instance = new web3.eth.Contract(
        Willdo.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        'Failed to load web3, accounts, or contract. Check console for details.'
      );
      console.error(error);
    }

    // Get our current choreCount
    const choreCount = await this.state.contract.methods.choreCount();
    choreCount.call((err, response) => {
      if (err != null) {
        alert('Failed to fetch choreCount.');
      }
      this.setState({
        choreCount: response
      });
    }).then(() => {
      for (var i = 0; i < this.state.choreCount; i++) {
        // ! NOTE remember we didn't 0-index our chore IDs for some fucking reason 
        this.state.contract.methods.chores(i + 1).call((err, response) => {
          if (err != null) {
            alert('Failed to fetch chore.');
          }
          this.setState({
            chores: [...this.state.chores, response],
          })
        })
      }
    })


    this.setState({
      choreName: "",
      daysToComplete: 0,
      chorePrice: 0,
    })
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
    var account = "";
    await this.state.web3.eth.getAccounts().then((acct) => {
      account = acct[0]
    })

    // Send eth to chore creation contract
    await this.state.web3.eth.sendTransaction({
      from: account,
      to: "0xb80665b9b19EdD441e4EFaB7EA375Ce82b4785fe",
      value: this.state.web3.utils.toWei(chorePrice, "ether")
    }).on('error', () => {
      alert('Error, or you rejected the transaction')
      window.location.reload()
    })

    // Get times to use for streak... there's 86400000ms in 1 day
    const currTimeStart = new Date().getTime()
    const currTimeEnd = currTimeStart + (daysToComplete * 86400000);

    // Create the chore on the contract
    await this.state.contract.methods.createChore(content, chorePrice, currTimeStart, currTimeEnd).send({ from: account }).on('receipt', () => {
      window.location.reload()
    })
  }

  render() {
    if (!this.state.web3) {
      // Loading web3, accounts, contract
      return <h1 style={{ textAlign: 'center', marginTop: '10em' }}>Loading...</h1>;
    }

    return (
      <div className="App">
        <h2>Willdo - You'll do it if there's money on the line</h2>
        {/* <Form layout="inline" onSubmit={(e) => this.createChore(e)}>
          <Form.Item>
            <Input placeholder="Chore" />
          </Form.Item>
          <Form.Item>
            <InputNumber placeholder="How long?" defaultValue={0} />
          </Form.Item>
          <Form.Item>
            <InputNumber defaultValue={0} />
          </Form.Item><br/>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
          </Button>
          </Form.Item>
        </Form> */}
        <form onSubmit={(e) => this.createChore(e)}>
          <input id="choreName" value={this.state.value} onChange={(e) => this.handleChange(e)} type="text" placeholder="What's the chore?" required /><br />
          <input id="daysToComplete" value={this.state.value} onChange={(e) => this.handleChange(e)} type="number" placeholder="How many days is the deadline?" required /><br />
          <input id="chorePrice" value={this.state.value} onChange={(e) => this.handleChange(e)} type="number" placeholder="How much ETH to attach to this?" required /><br />
          <input type="submit" />
        </form>
        <ChoreList chores={this.state.chores} />
      </div>
    );
  }
}

export default App;
