import React from "react";
import { Card } from 'antd';

class Chore extends React.Component {
    render() {
        return (
            <div style={{padding:'1em'}}>
                {/* NOTE could use extra={<a href="#">More</a>} in this Card */}
                <Card title={this.props.choreName} style={{ width: 400, textAlign: 'left' }}>
                    <p>You have {dhm(this.props.endTime - this.props.startTime)} day(s) left to complete this chore</p>
                    <p>You have ⧫{this.props.price} riding on completing this!</p>
                </Card>
            </div>
        )
    }
}

function dhm(t){
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000);
        // pad = function(n){ return n < 10 ? '0' + n : n; };
  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }
  // return [d, pad(h), pad(m)].join(':');
  return d;
}


export default Chore;