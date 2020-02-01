pragma solidity >=0.4.21 <0.7.0;

contract Willdo {
    // Chore count... very naiive ID for the time being
    uint public choreCount = 0;

    // Chore object - the crux of what each person will do
    struct Chore {
        uint id; // UID of each chore
        uint price; // How much you're willing to risk on completing this chore
        string content; // The chore to complete
        uint daysToComplete; // Days to complete the chore
        address approver; // The person responsible for approving the Chore was actually completed
        bool completed; // Whether or not the chore is completed
    }

    event ChoreCreated(
        uint id,
        uint price,
        string content,
        uint daysToComplete,
        address approver,
        bool completed
    );

    event ChoreCompleted(
        uint id,
        bool completed,
        address approver
    );

    // List of chores by ID
    mapping(uint => Chore) public chores;

    // TODO eventually update memory with an implementation of IPFS so we aren't storing all this on the blockchain
    // TODO add the capability to attach eth to the transaction to hold yourself accountable
    // Create a new chore object and timelock the money
    function createChore(string memory _content, uint _chorePrice, uint _daysToComplete, address _approver) public payable {

        // Increase ID
        choreCount ++;

        // Create and emit the Chore object
        chores[choreCount] = Chore(
            choreCount,
            _chorePrice,
            _content,
            _daysToComplete,
            _approver,
            false
        );
        emit ChoreCreated(choreCount, _chorePrice, _content, _daysToComplete, _approver, false);

        // TODO timelock the Ether
    }

    // Complete the chore
    function completeChore(uint _id) public {
        Chore memory _chore = chores[_id];

        // TODO implement a check for a third party to say that the chore is completed

        _chore.completed = true;
        chores[_id] = _chore;
        emit ChoreCompleted(_id, _chore.completed, _chore.approver);

        // TODO get the eth from the timelock and return it to the user
    }

    // function () public payable { }
}