const Willdo = artifacts.require('./Willdo.sol')

// For each Ganache account...
contract('Willdo', (accounts) => {

    // Before each test runs, get a copy of the contract
    before(async () => {
        this.willdo = await Willdo.deployed()
    })

    it('deploys successfully', async () => {
        const address = await this.willdo.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('lists chores', async () => {
        const choreCount = await this.willdo.choreCount()
        const chore = await this.willdo.chores(choreCount)
        assert.equal(chore.id.toNumber(), choreCount.toNumber())
    })

    it('creates chores', async () => {
        const result = await this.willdo.createChore('A new chore', 5, 86400000, 172800000)
        const choreCount = await this.willdo.choreCount()
        assert.equal(choreCount, 1)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.content, 'A new chore')
        assert.equal(event.price.toNumber(), 5)
        assert.equal
        assert.equal(event.completed, false)
    })

    it('toggles chore completion', async () => {
    const result = await this.willdo.completeChore(1)
    const chore = await this.willdo.chores(1)
    assert.equal(chore.completed, true)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.completed, true)
    })

    // TODO add more robust tests and assertions
    it('tests send to charity', async () => {
        
    })

    // TODO add more robust tests and assertions
    it('returns to user', async () => {

    })
})