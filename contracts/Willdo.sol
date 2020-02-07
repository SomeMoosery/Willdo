pragma solidity ^0.5.0;

contract Willdo {
    // Chore count... very naiive ID for the time being
    uint public choreCount = 0;

    // Chore object - the crux of what each person will do
    struct Chore {
        uint id; // UID of each chore
        uint price; // How much you're willing to risk on completing this chore
        string content; // The chore to complete
        uint startTime;
        uint endTime;
        bool completed; // Whether or not the chore is completed
    }

    event ChoreCreated(
        uint id,
        uint price,
        string content,
        // uint daysToComplete,
        uint startTime,
        uint endTime,
        bool completed
    );

    event ChoreCompleted(
        uint id,
        bool completed
    );

    // List of chores by ID
    mapping(uint => Chore) public chores;

    // Transfers the appropriate amount of money to the charity we're currently donating to
    function sendToCharity(uint _ethToSend, address payable _charity) public payable {
        // address.send(ethToSend);
        // charity.call.value(ethToSend)();
        _charity.transfer(_ethToSend);
    }

    // TODO eventually update memory with an implementation of IPFS so we aren't storing all this on the blockchain
    // TODO add the capability to attach eth to the transaction to hold yourself accountable
    // Create a new chore object and timelock the money
    // TODO re-add _approver if we want to have a beneficiary, but for now we're just going self-motivated
    function createChore(string memory _content, uint _chorePrice, uint _startTime, uint _endTime) public payable {

        // Increase ID
        choreCount ++;

        // Create and emit the Chore object
        chores[choreCount] = Chore(
            choreCount,
            _chorePrice,
            _content,
            _startTime,
            _endTime,
            false
        );
        emit ChoreCreated(choreCount, _chorePrice, _content, _startTime, _endTime, false);

        // TODO timelock the Ether
    }

    // Complete the chore
    function completeChore(uint _id) public {
        Chore memory _chore = chores[_id];

        // TODO implement a check for a third party to say that the chore is completed

        _chore.completed = true;
        chores[_id] = _chore;
        emit ChoreCompleted(_id, _chore.completed);

        // TODO get the eth from the timelock and return it to the user
    }

    function () external payable {}
}