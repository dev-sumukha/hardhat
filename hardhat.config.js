/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")

const ALCHEMY_API_KEY = "Sg8wRYrbsxAtlFiP0fKvzaVLzmZEmYaH";
const GOERLI_PRIVATE_KEY = "9bcae6d4998a28b0aeb9da3958fa354855784143fd3671a662ab02d350317db9";

module.exports = {
  solidity: "0.8.17",

  networks:{
    goerli:{
      url:`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${GOERLI_PRIVATE_KEY}`]
    }
  }
};
