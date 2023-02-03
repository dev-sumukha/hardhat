const {expect} = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe('Token Contract', () => { 
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    // beforeEach will be included before execution of the code

    beforeEach(async function(){
        Token = await ethers.getContractFactory("Token");
        [owner,addr1,addr2,...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    })

    describe('Deployment',function(){
        it("Should be the correct owner",async function(){
            expect(await hardhatToken.owner()).to.equal(owner.address);
        })

        it("Shoud assign the total supply of tokens of owner",async function(){
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        })
    })

    describe('Transaction Testing', function(){
        it("Should transfer tokens between accounts",async function(){
            // transferring from owner address

            await hardhatToken.transfer(addr1.address,5);
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5);

            // disconnecting from owner and connecting to addr1
            await hardhatToken.connect(addr1).transfer(addr2.address,5);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(5);
        });

        // it("Should fail if sender does not have tokens",async ()=>{
        //     const initalOwnerBalance = await hardhatToken.balanceOf(owner.address);
        //     await expect(hardhatToken.connect(addr1).transfer(owner.address)).to.be.revertedWith("Not enough tokens"); // initally it will have 0 balance
        //     expect(await hardhatToken.balanceOf(owner.address)).to.equal(initalOwnerBalance);
        // });

        it("Should update balances after transfer",async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(addr1.address,5);
            await hardhatToken.transfer(addr2.address,10);

            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance - 15);

            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5);

            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(10);
        });

    })
})