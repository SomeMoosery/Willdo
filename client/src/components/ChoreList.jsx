import React from 'react';
import Chore from './Chore';

class ChoreList extends React.Component {
    render() {
        return (
            <div>
                {this.props.chores.map((chore) => {
                    // ! TODO programatically create table
                    return <Chore 
                        key={chore.id}
                        choreName={chore.content}
                        daysToComplete={chore.daysToComplete}
                        startTime={chore.startTime}
                        endTime={chore.endTime}
                        price={chore.price}
                    />
                })}
            </div>
        )
    }
}

export default ChoreList;