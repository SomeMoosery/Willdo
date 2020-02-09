import React from "react";
import { Card } from 'antd';

class Chore extends React.Component {
    choreName = this.props.choreName
    startTime = this.props.startTime
    endTime = this.props.endTime
    price = this.props.price

    // If we hit some time deadline, send that wagered ETH to charity!
    // TODO update Ganache account to a real charity
    // https://350.org/other-ways-to-give/
    // https://www.coolearth.org/cryptocurrency-donations/
    async sendToCharity() {
        console.log('send', this.props.contract.methods)
        console.log('price:', this.price)
        await this.props.contract.methods.sendToCharity(this.price, "0x5798F4232Af37FBBa9AF51b7Ab8918376984A196").send({ from: "0x0b9fb8FA6a82ba7eFDbFFfB0c7ff5350932e5514" }).on('receipt', function(receipt){
            console.log(receipt)
        })
    }

    render() {
        return (
            <div style={{ padding: '1em' }}>
                {/* NOTE could use extra={<a href="#">More</a>} in this Card */}
                <Card title={this.choreName} style={{ width: 400, textAlign: 'left' }}>
                    <p>You have {getDays(this.endTime - this.startTime)} {singularPluralDay(this.startTime, this.endTime)} left of this streak</p>
                    <p>You have ⧫{this.price} riding on completing this!</p>
                    <p>You've kept this streak up for {msToTime(new Date().getTime() - this.startTime)} </p>
                    <button onClick={(e) => this.sendToCharity(e)}>Send to charity</button>
                </Card>
            </div>
        )
    }
}

function singularPluralDay(startTime, endTime) {
    if (getDays(endTime - startTime) === 1) return 'day'
    return 'days'
}

function getDays(t) {
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor((t - d * cd) / ch),
        m = Math.round((t - d * cd - h * ch) / 60000);
    if (m === 60) {
        h++;
        m = 0;
    }
    if (h === 24) {
        d++;
        h = 0;
    }
    return d;
}

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ' hours, ' + mins + ' mins, ' + secs + ' seconds';
}


export default Chore;