const [owner,add1,add2] = await ethers.getSigners();
const Token = await ethers.getContractFactory("Token");
const hardhatToken = Token.deploy();

// Transfer 10 tokens from owner to add1
// its assumed or it is set to by-default as a sender

await hardhatToken.transfer(add1.address,10);
expect(await hardhatToken.balanceOf(add1.address)).to.equal(10);

// Transfer 5 tokens from add1 to add2
// we nee to change the address of the sender

await hardhatToken.connect(add1).transfer(add2.address,5);
expect(await hardhatToken.balanceOf(add2.address)).to.equal(5);






// complete code
describe("Token contract",function(){
    it("Deployment should assign the total no. of tokens",async function(){
        const [owner] = await ethers.getSigners(); // signers means accounts in hardhat
        // const signers = await ethers.getSigners();
        console.log("Signer Object: ",owner);
        const Token = await ethers.getContractFactory("Token"); // creating the instance of the token

        const hardhatToken = await Token.deploy(); // deploying the contract
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        console.log("owner address: ",ownerBalance);

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    })

    it("Should transfer tokens between accounts",async function(){
        const [owner,addr1,addr2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();

        // transferring 10 tokens from owner to addr1

        await hardhatToken.transfer(addr1.address,10);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

        // transferring 5 tokens from addr1 to addr2
        await hardhatToken.connect(addr1).transfer(addr2.address,5);
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
    })

})