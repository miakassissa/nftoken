const Color = artifacts.require('./Color.sol')

require('chai').use(require('chai-as-promised')).should()

contract('Color', (accounts) => {
    let contract

    before(async () => {
        contract =await Color.deployed()
    })

    describe('deploiement', async() => {
        it("s'est déployé avec succès", async () => {
            contract = await Color.deployed()
            const address = contract.address
            // console.log(address)
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)            
        })

        it('a un nom', async () => {
            const name = await contract.name()
            assert.equal(name, 'Color')
        })

        it("a un symbole", async () => {
          const symbol = await contract.symbol();
          assert.equal(symbol, "COLOR")
        })
    
    })

    describe('minting', async () => {

        it('crée un nouveau token', async () => {
            const result = await contract.mint('#EC058E')
            const totalSupply = await contract.totalSupply()

            // SUCCESS
            assert.equal(totalSupply, 1)            
            // console.log(result)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 1, "l'id est correct")
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', "le champ 'form' est correct")
            assert.equal(event.to, accounts[0], "le champ 'to' est correct")

            // FAILURE > Can not MINT same color TWICE!
            await contract.mint("#EC058E").should.be.rejected;

        })
    })

    describe('indexing', async () => {
        it('liste les couleurs', async () => {
            // Mint 3+ tokens
            await contract.mint('#FFDD09')
            await contract.mint('#FFFFFF')
            await contract.mint('#000000')
            const totalSupply = await contract.totalSupply()

            let color
            let result = []

            for (var i=1; i<= totalSupply; i++) {
                color = await contract.colors(i-1)
                result.push(color)
            }
            let expected = ["#EC058E","#FFDD09", "#FFFFFF", "#000000"];
            assert.equal(result.join(','), expected.join(','))
        })
    })
})