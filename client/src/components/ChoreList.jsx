import React from 'react';
import Chore from './Chore';

class ChoreList extends React.Component {
    render() {
        return (
            <div>
                {this.props.chores.map((chore) => {
                    return <Chore 
                        key={chore.id}
                        choreName={chore.content}
                        daysToComplete={chore.daysToComplete}
                        approver={chore.approver}
                        price={chore.price}
                    />
                })}
            </div>
        )
    }
}

export default ChoreList;