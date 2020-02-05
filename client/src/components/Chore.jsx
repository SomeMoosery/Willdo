import React from "react";
import { Card } from 'antd';

class Chore extends React.Component {
    render() {
        return (
            <div style={{padding:'1em'}}>
                <Card title={this.props.choreName} extra={<a href="#">More</a>} style={{ width: 400, textAlign: 'left' }}>
                    <p>You have {this.props.daysToComplete} day(s) left to complete this chore</p>
                    <p>{this.props.approver}</p>
                    <p>You have ⧫{this.props.price} riding on completing this!</p>
                </Card>
            </div>
        )
    }
}

export default Chore;