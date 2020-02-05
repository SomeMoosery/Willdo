import React from "react";

class Chore extends React.Component {
    render() {
        return (
            <div style={{textAlign:"left"}}>
                Name: {this.props.choreName}<br/>
                Days Left to Complete: {this.props.daysToComplete}<br/>
                Approver: {this.props.approver}<br/>
                Price: ${this.props.price}<br/>
            </div>
        )
    }
}

export default Chore;