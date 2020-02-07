# WillDo
Incentivization by betting real currency on yourself to work towards your goals, with the help of the Ethereum blockchain

## General Idea
Jerry Seinfeld is famous for publicizing the "Don't Break the Chain" discipline technique. Every January, he'd put up a calendar. Every day he wrote _some_ material, he'd draw a big red "X" through the box for that day. The ever-growing chain of days where he'd write something became so addicting that he never wanted to break that chain of writing _something_, even if just the tiniest bit, every day.

I can attribute this simple technique to a drastically-improved life. Using this technique, I've lost 75 pounds, gotten in shape, got a job as a software engineer in NYC, among countless others. It works for me, and I believe it can work for everyone... as long as they're honest and truly committed to it.

Now, I've created a discipline-enhancing utility that forces individuals to apply the same mentality (if they so choose), assisted by blockchain technology. Enter in a task you want to do every day (for how many days in a row you aim to do this, as well). Wager some ETH on yourself actually doing this every day to add a monetary penalty to the guilt of breaking the chain. All this info is sent to and stored on the Ethereum blockchain (TODO on IPFS). Every day you complete the task, you get back a portion of your initial investment on yourself. Every day you don't complete the task, that money is out of your pocket, forever (and donated to +350, a charity aiming to stop fossil fuel emissions).

Get to work.

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