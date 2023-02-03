async function test(){
    const [deployer] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    console.log("address : ",token.address);
}

test()
.then(()=>process.exit(0))
.catch((err)=>{
    console.error(err);
    process.exit(1);
}) 