# WillDo
Incentivization by putting money on the line to complete your chores, built on the Ethereum blockchain and validated by a trusted friend

## Running WillDo Locally

1. Ensure you have a [MetaMask](https://metamask.io/) wallet running
2. Ensure you have a [Truffle](https://www.trufflesuite.com/) installed, and a local [Ganache](https://www.trufflesuite.com/ganache) blockchain
3. Clone this repo `git clone https://github.com/somemoosery/willdo`
4. `cd willdo`
5. `npm install`
6. `cd client && npm run start` (running on Port 3000)

## Troubleshooting

### Not connecting to Ganache?
**Make sure that you're pointing to the right port on `getWeb3.js` and `truffle-config`, probably 7545**